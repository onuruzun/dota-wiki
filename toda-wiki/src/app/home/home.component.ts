import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, OnInit } from "@angular/core";
import { NodeJsApi } from "../service/nodejs-api";
import { HeroesModel } from "../model/heroes";
import { alert } from "tns-core-modules/ui/dialogs";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    providers: [NodeJsApi],
    moduleId: module.id,
})
export class HomeComponent implements OnInit {
    public tabSelectedIndex: number;
    public tabSelectedIndexResult: string;

    constructor(private localApiService: NodeJsApi) {
        this.tabSelectedIndex = 0;
        this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";
    }
    isBusy: boolean;
    heroModel: HeroesModel;

    changeTab() {
        if (this.tabSelectedIndex === 0) {
            this.tabSelectedIndex = 1;
        } else if (this.tabSelectedIndex === 1) {
            this.tabSelectedIndex = 2;
        } else if (this.tabSelectedIndex === 2) {
            this.tabSelectedIndex = 0;
        }
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        if (args.oldIndex !== -1) {
            const newIndex = args.newIndex;
            if (newIndex === 0) {
                this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";
            } else if (newIndex === 1) {
                this.tabSelectedIndexResult = "Stats Tab (tabSelectedIndex = 1 )";
            } else if (newIndex === 2) {
                this.tabSelectedIndexResult = "Settings Tab (tabSelectedIndex = 2 )";
            }
            alert(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`)
                .then(() => {
                    console.log("Dialog closed!");
                });
        }
    }

    getHero() {
        this.isBusy = true;
        this.localApiService.getHero().subscribe((data: HeroesModel) => {
            console.log(data);
            if (data)
                this.heroModel = data;
        });
        this.isBusy = false;
    }

    getItemIndex(args: ItemEventData): void {
        this.getHeroName(args.index);
    }

    getHeroName(count: any): void {
        console.log("Karakter: " + this.heroModel.hero[count].name);
    }

    ngOnInit(): void {
        this.getHero();
    }
}
