import { AboutThisGame } from "@/components/GameItemPage/AboutThisGame";
import { GameDetails } from "@/components/GameItemPage/GameDetails";
import { LatestUpdates } from "@/components/GameItemPage/LatestUpdates";
import { PageLayout } from "@/components/PageLayout";
import { SystemRequirements } from "@/components/GameItemPage/SystemRequirements";

export function createGameItemPage () {

    return (
        <div>
            <PageLayout>
                <AboutThisGame></AboutThisGame>
               <GameDetails></GameDetails>
               <LatestUpdates></LatestUpdates>
               <SystemRequirements></SystemRequirements>
            </PageLayout>
        </div>
    );

}