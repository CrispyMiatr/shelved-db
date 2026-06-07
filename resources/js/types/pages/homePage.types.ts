import { BeverageType } from "../beverage.types";
import { UserType } from "../user.types";

export interface HomePageType {
    newlyAdded: BeverageType[];
    newlyReleased: BeverageType[];
    popularProfiles: UserType[];
}