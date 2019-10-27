import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, OnInit } from "@angular/core";
import { NodeJsApi } from "../service/nodejs-api";
import { HeroesModel } from "../model/heroes";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { RandomEmojis } from "../assets/random-emojis";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    providers: [NodeJsApi, RandomEmojis]
})

export class HomeComponent implements OnInit {

    constructor(private localApiService: NodeJsApi, private randomEmoji: RandomEmojis) {
        this.tabSelectedIndex = 0;
        this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";
    }
    isBusy: boolean;
    heroModel: HeroesModel;
    tabSelectedIndex: number;
    tabSelectedIndexResult: string;
    selectedCharacter: string = 'Dota 2';
    selectedCharacterId: number;
    selectedCharacterDesc: string;
    selector: boolean;

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        this.tabSelectedIndex = args.newIndex;
        if (args.oldIndex !== -1) {
            const newIndex = args.newIndex;
            if (newIndex === 0) {
            } else if (newIndex === 1) {
            }
        }
    }

    goDetailTab() {
        this.tabSelectedIndex = 1;
    }

    getHero() {
        this.isBusy = true;
        this.localApiService.getHero().subscribe((data: HeroesModel) => {
            if (data) {
                this.heroModel = data;
            }
        });
        this.isBusy = false;
    }

    getItemIndex(args: ItemEventData): void {
        this.getHeroName(args.index);
    }

    getHeroName(count: any): void {
        this.selectedCharacter = this.heroModel.hero[count].localized_name;
        this.selectedCharacterId = this.heroModel.hero[count].id;
        this.selectedCharacterDesc = this.randomEmoji.getRandomEmojis(count);
    }

    ngOnInit(): void {
        this.getHero();
    }
}
