import { Component, OnInit,AfterViewInit} from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/_services/common.service';
import { TranslationService } from '../../../assets/translation/translation.service';
import { LangPipe } from 'src/app/pipe/pipe';
import { ToastService } from 'src/app/_services/toast.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
//   isshowProfile=false;
  userInfo:any;
//   lang:any='English';
//   constructor(
//     private authenticationService:AuthenticationService,
//     private http: HttpClient,
//     private commonService:CommonService
//   ) { }

//   ngOnInit(): void {
//    this.getaccount();
   
//   }
//   onChange(event: any){
//     console.log(event.target.value)
//     let val=event.target.value;
//     if (val === 'ar') {
//       localStorage.setItem('lang', 'ar');
//     } else if (val === 'en') {
//       localStorage.setItem('lang', 'en');
//     } else if (val === 'fr') {
//       localStorage.setItem('lang', 'fr');
//     }
//   }

//   logout(){
//     this.authenticationService.logout();
//   }

 

//   async getaccount() {
//     this.userInfo=await this.commonService.GetAccount().toPromise();
    
// }
 
//   showProfile(){
//    this.isshowProfile=!this.isshowProfile;
//   }

// }

isshowProfile=false;
  constructor(
    private authenticationService:AuthenticationService,
    private translationService:TranslationService,
    private langFilepipe:LangPipe,
    private commonService:CommonService,
    private toastService:ToastService,
  
  ) { 
    this.initializeLanguage();
    this.userprefenceList();
  }


 

  changeLanguage(newLang: string) {
    localStorage.setItem('lang', newLang);
    this.initializeLanguage();
  }

  private initializeLanguage() {
    const storedLang = localStorage.getItem('lang');
    this.lang = storedLang || 'en';
    this.translationService.initialize();
  }
  lang:any='English';
  userName:any='';
  userId:any;
  perfencesModel:boolean=false;
  orgList:any=[];
  prefencesList:any;
  ngOnInit(): void {
   this.getaccount();
    // this.getOrganization();
  //  this.userName=JSON.parse(localStorage.getItem('currentUser') || '');
  //  this.userId=this.userName.userId;
  //  this.userName=this.userName.userName;

  
  }

  // getOrganization(){
  //   this.authenticationService.organizationSwitch().subscribe(
	// 		(response:any) => {
        
	// 			this.orgList=response.data[0];
  //       console.log("response",this.orgList)
	// 		},
	// 		(error) => {
				
	// 			console.error('POST Error:', error);
	// 		}
	// 	);
  // }

  async getaccount() {
    this.userInfo=await this.commonService.GetAccount().toPromise();
    
  }
  onChange(event: any){
  
    let val=event;
    if(val=="fr"){
      localStorage.setItem("lang","fr");
      this.lang='French';
      this.translationService.initialize();
    }
    else{
      localStorage.setItem("lang","en");
      this.lang='English'
    }
  }
  logout(){
    this.authenticationService.logout();
  }
 
  showProfile(){
   this.isshowProfile=!this.isshowProfile;
  }
userPrefencesModel(){
this.perfencesModel=!this.perfencesModel;
}

userprefenceList(){
  // this.authenticationService.getUserPrefencesList().subscribe(
  //   (response:any) => {
      
  //     this.prefencesList=response.data[0];
  //     console.log("response prefences",response.data[0]);
  //     this.prefencesList.forEach((item:any) => {
      
  //       const defaultValue = item.sqlValidationData.find((data:any) => data.profileCode === item.profileOptionValue);
  //       if (defaultValue) {
  //         this.onSelectChange(item.profileOptionId, item.profileOptionCode, { target: { value: defaultValue.profileCode } });
  //       }
  //     });
  //   },
  //   (error) => {
      
  //     console.error('POST Error:', error);
  //   }
  // );
}
selectedValues: any = [];


onSelectChange(profileOptionId: number, profileOptionCode: string, event: any) {
  const value = event.target.value;
  if (value !== null && value !== undefined) {
    const existingIndex = this.selectedValues.findIndex((item :any)=> item.profileOptionId === profileOptionId);

    const selectedValue = {
    
      profileOptionValue: value,
      profileOptionId: profileOptionId
    };

    if (existingIndex !== -1) {
      this.selectedValues[existingIndex] = selectedValue;
    } else {
      this.selectedValues.push(selectedValue);
    }
  }
}
toastMsgObj:any;
savePrefences(){

  // this.selectedValues.map((x:any)=>{
  //   x.userId=this.userId;
  // })
  // console.log("selected data",this.selectedValues);
  
  // this.authenticationService.saveUserPrefences(this.selectedValues).subscribe(
  //   (response:any) => {
      
  //     this.toastMsgObj = {
  //       msgType: response.responseMessageType,
  //       msgText: this.langFilepipe.transform(response.responseCode)
  //     }
  //     this.toastService.addToast(this.toastMsgObj);
  //     this.userprefenceList();
  //   },
  //   (error) => {
      
  //     console.error('POST Error:', error);
  //   }
  // );



}
}


