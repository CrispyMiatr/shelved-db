<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OcrController extends Controller
{
    public function process(Request $request)
    {
        $request->validate([
            'images' => 'required|array|min:1|max:4',
            'images.*' => 'image|max:5120',
        ]);

        $apiKey = config('services.gemini.key');
        $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        $parts = [['text' => $this->getPrompt()]];

        foreach ($request->file('images') as $file) {
            $parts[] = [
                'inline_data' => [
                    'mime_type' => $file->getMimeType(),
                    'data' => base64_encode(file_get_contents($file->getRealPath())),
                ]
            ];
        }

        $jsonSchema = [
            'type' => 'OBJECT',
            'properties' => [
                'name' => ['type' => 'STRING'],
                'brand_name' => ['type' => 'STRING'],
                'company_name' => ['type' => 'STRING'],
                'volume_ml' => ['type' => 'STRING', 'description' => 'The total volume in mL (digits only).'],
                'barcode' => ['type' => 'STRING'],
                'translations' => [
                    'type' => 'ARRAY',
                    'items' => [
                        'type' => 'OBJECT',
                        'properties' => [
                            'lang' => ['type' => 'STRING'],
                            'ingredients' => ['type' => 'STRING'],
                            'warning_text' => ['type' => 'STRING'],
                            'extra_info' => ['type' => 'STRING']
                        ],
                        'required' => ['lang', 'ingredients', 'warning_text', 'extra_info']
                    ]
                ],
                'nutrition_items' => [
                    'type' => 'ARRAY',
                    'items' => [
                        'type' => 'OBJECT',
                        'properties' => [
                            'name' => ['type' => 'STRING'],
                            'per_100ml' => ['type' => 'STRING'],
                            'per_total_volume' => ['type' => 'STRING', 'description' => 'Nutrition value for the full container volume.']
                        ],
                        'required' => ['name', 'per_100ml', 'per_total_volume']
                    ]
                ]
            ],
            'required' => ['name', 'brand_name', 'company_name', 'translations', 'nutrition_items', 'volume_ml']
        ];

        $response = Http::post($endpoint, [
            'contents' => [['parts' => $parts]],
            'generationConfig' => [
                'response_mime_type' => 'application/json',
                'response_schema' => $jsonSchema
            ]
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'AI processing failed'], 500);
        }

        return response()->json(json_decode($response->json('candidates.0.content.parts.0.text'), true));
    }

    private function getPrompt()
    {
        return "You are an expert beverage data extraction tool. 
        Analyze the images of the can/bottle.
        
        Rules:
        1. PRODUCT NAME: Extract ONLY the product variant name. DO NOT include the brand. If the brand is 'Coca-Cola' and it says 'Coca-Cola Zero Sugar', the brand_name is 'Coca-Cola' and the name is 'Zero Sugar'.
        2. COMPANY NAME: Look for copyright/trademark holders (e.g., '© The Coca-Cola Company' or '© PepsiCo'). DO NOT use regional distributor contact addresses.
        3. MANDATORY TRANSLATION & MULTILINGUAL BLOCKS: 
           - For each language found on the packaging (e.g. Dutch, French), create an item in the 'translations' array.
           - Extract the ingredients list, warning text (allergens, caffeine, etc.), and extra info (reclaiming details, recyclability, storage advice).
           - If English is missing on the can, you must translate ingredients, warnings, and extra info into English and append a new 'en' item to the 'translations' array.
        4. NUTRITION & THE ENERGY ROW RULE:
           - Always provide values 'per_100ml' AND 'per_total_volume' (the value for the full container). If values are missing on the can, mathematically calculate them based on the volume_ml.
           - CRITICAL RULE FOR ENERGY: Do NOT create separate rows for 'Energy (kJ)', 'Energy (kcal)', or 'Calories'. There must be exactly ONE row named 'Energy'.
             a. If both kJ and kcal measurements are present, merge them into the single 'Energy' row formatted exactly as: 'X kJ / Y kcal' (e.g., '1.4 kJ / 0.3 kcal' or '14 kJ / 3 kcal').
             b. If only 'Calories' are present (like on US packaging), map it to the 'Energy' row and format the value as 'Y kcal' (e.g., '150 kcal' or '0.3 kcal'). Do not use 'Calories' as the row name; always use the unified name 'Energy'.";
    }
}