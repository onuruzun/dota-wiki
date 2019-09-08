import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, OnInit } from "@angular/core";
import { NodeJsApi } from "../service/nodejs-api";
import { HeroesModel } from "../model/heroes";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    providers: [NodeJsApi]

})
export class HomeComponent implements OnInit {

    constructor(private localApiService: NodeJsApi) {
    }

    heroName: string[] = [];
    heroId: number[] = [];
    heroLocalizedName: string[] = [];

    getHero() {
        this.localApiService.getHero().subscribe((data: HeroesModel) => {
            console.log(data);
            if (data) {
                data.hero.forEach(items => {
                    this.heroName.push(items.name);
                    this.heroId.push(items.id);
                    this.heroLocalizedName.push(items.localized_name);
                })
            }
        });
    }

    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');
    }

    ngOnInit(): void {
        this.getHero();
    }
}
