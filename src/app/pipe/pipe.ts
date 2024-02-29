import { Pipe, PipeTransform, NgModule } from "@angular/core";

import { CommonModule, DatePipe } from "@angular/common";
import { TranslationService } from '../../assets/translation/translation.service';


@Pipe({ name: 'lang', pure: false })
export class LangPipe implements PipeTransform {
    constructor(private transaltion: TranslationService) { }
    transform(value: string): string {
        const storedLang = localStorage.getItem("lang");
        
        if (storedLang !== null && storedLang !== "") {
            this.transaltion.language = storedLang;
        } else {
            this.transaltion.language = "en";
        }
        
        return this.transaltion.translate(value);
    }
}
@NgModule({
    imports: [CommonModule],
    declarations: [
       
        LangPipe,
      
    ],
    providers: [
      
      
        LangPipe,
     
    ],
    exports: [
      
        LangPipe,
      
    ]
})

export class SharedPipeModule {

}


