import { Component, OnInit, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { first } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/_services/common.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/_services/loader.service';
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  currentUser: any;
  menu_data: any;
  error = '';
  userInfo: any;
  userInfoauthorities: any;
  showCreateUser: boolean = false;
  selectedModule: string | null = null; 
  constructor(
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private router: Router,
    private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    const myScriptUrl = 'assets/js/myscript.js';
    this.loadScript(myScriptUrl);
    // this.currentUser= localStorage.getItem('currentUser');
    // this.currentUser=JSON.parse(this.currentUser);
    this.getmenu();
  }
  // toggleDropdown(item: any): void {
  //   item.showDropdown = !item.showDropdown;
  //   this.selectedModule = this.selectedModule === item.modulename ? null : item.modulename;
  // }
  isHovered: boolean = false;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  logout() {
    this.authenticationService.logout();
  }
  registration() {
    this.router.navigate(['/registration']);
  }
  // User() {
  //   this.router.navigate(['/user']);
  // }
  // AddUser() {
  //   this.router.navigate(['/user/add-user']);
  // }
  // ModifyUser() {
  //   this.router.navigate(['/user/modify-user']);
  // }
  // AccessManagement() {
  //   this.router.navigate(['/user/access-management']);
  // }
  // ManageGroup() {
  //   this.router.navigate(['/user/manage-group']);
  // }
  // AccessProfile() {
  //   this.router.navigate(['/user/access-profile']);
  // } 
  // UserReport() {
  //   this.router.navigate(['/user/user-report']);
  // }
  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
  loadScript(scriptUrl: string) {
    const scriptElement = this.renderer.createElement('script');
    scriptElement.src = scriptUrl;
    this.renderer.appendChild(this.document.body, scriptElement);
  }
  toggleSubmenu(item: any) {
    item.showSubmenu = !item.showSubmenu;
  }

  async getaccount() {
    this.userInfo = await this.commonService.GetAccount().toPromise();
    const userInfoJSON = JSON.stringify(this.userInfo);
    localStorage.setItem('userInfo', userInfoJSON);
    console.log("userInfo", this.userInfo);
    this.userInfoauthorities = this.userInfo.authorities;
  }

  async getmenu() {
    this.loaderService.showLoader();
    await this.getaccount();
    console.log("userInfo.authorities", this.userInfoauthorities);
    // this.commonService.modules(this.userInfo.authorities)
    const authoritiesId = this.userInfoauthorities;
    this.commonService.modules(authoritiesId)
      .pipe(first())
      .subscribe(
        data => {
          data.forEach((module:any) => module.updown = false);
          data.sort((a: any, b: any) => a.modulename.localeCompare(b.modulename));// sort side menu based on alphabet 
          this.menu_data = data;
          console.log("menu_data", this.menu_data);
          this.loaderService.hideLoader();

        },
        error => {
          this.error = error;
        }
      );
    //  const myScriptUrl = 'assets/js/myscript.js';
    //  this.loadScript(myScriptUrl);
  }

  transformFunctionName(funcName: string): string {
    return funcName.toLowerCase().replace(/\s+/g, '-');
  }

  generateRoute(moduleName: string, functionName: string): string {
    // if(moduleName=='User' && functionName=='Manage Group'){
    //   document.getElementById('adduser')?.click()
     
    // }
    return `${moduleName.toLowerCase()}/${functionName.toLowerCase().replace(/\s+/g, '-')}`;
  }
  
   configFlag:boolean=false;
  configurationFlag(){
this.configFlag=!this.configFlag;
this.bilflg=false;
  }
  // toggleDropdown(item: any): void {
  //   if (this.selectedModule === item.modulename) {
  //     item.showDropdown = !item.showDropdown;
  //   } else {
  //     this.menu_data.forEach((menuItem:any) => {
  //       menuItem.showDropdown = false;
  //     });
  //     item.showDropdown = true;
  //     this.selectedModule = item.modulename;
  //   }
  
  //   console.log('selectedModule:', this.selectedModule);
  //   console.log('item.showDropdown:', item.showDropdown);
  // }
  toggleDropdown(item: any, index: number): void {
    if (this.selectedModule === item.modulename) {
      item.showDropdown = !item.showDropdown;
    } else {
      this.menu_data.forEach((menuItem: any, i: number) => {
        menuItem.showDropdown = false;
        if (index === i) {
          menuItem.updown = true;
        } else {
          menuItem.updown = false;
        }
      });
      item.showDropdown = true;
      this.selectedModule = item.modulename;
    }
  
    console.log('selectedModule:', this.selectedModule);
    console.log('item.showDropdown:', item.showDropdown);
  }
  
  bilflg:boolean=false;
  billingFlag(){
this.bilflg=!this.bilflg;
this.configFlag=false;
  }


}
