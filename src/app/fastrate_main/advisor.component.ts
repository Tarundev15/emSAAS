import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.css']
})
export class AdvisorComponent {
  addForm:any= FormGroup;
  roleForm:any=FormGroup
  show:boolean=false;
  submitted:boolean=false;
  constructor( private formbuilder:FormBuilder){
   this.addFormmethod();
   this.addroleFormMethod()
  }
  onChange(event: any){
    console.log(event.target.value)
    let val=event.target.value;
    if(val=="ar"){
      localStorage.setItem("lang","ar")
    }
    else if(val=="fr"){
      localStorage.setItem("lang","fr")
    }
    else{
      localStorage.setItem("lang","en")
    }
  }
  addbutton:boolean=false;
  editbutton:boolean=false;
  editIndex:any;
  edit(data:any,i:any){
    this.addbutton=false;
    this.editbutton=true;
    console.log("edit data",data);
    this.addForm.controls['name'].setValue(data.name);
    this.addForm.controls['displayName'].setValue(data.displayName);
    this.addForm.controls['email'].setValue(data.email);
    this.addForm.controls['password'].setValue(data.password);
this.editIndex=i;

  }
  addroleForm(){
    
console.log(this.roleForm.value)
  }
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
   
  }

  closeModal() {
    this.showModal = false;
    console.log("checkbox",this.permissionArray)
  }
  addroleFormMethod(){
    this.roleForm=this.formbuilder.group({
      roleName:[''],

    })
  }
  permissionArray: any = [{
    rolenames: "billing",
    permission: [
      {
        txt: "usermanagement",
        acess: true,
        subpermisson: [
          { text: "edit", acess: true },
          { text: "delete", acess: false },
          { text: "notification", acess: true }
        ]
      }
    ]
  }];
  
  addUser(){
 
this.submitted=false;
this.addForm.reset();
this.addbutton=true;
this.editbutton=false;
  }
  addFormmethod(){
    this.addForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['',],
      addedon:['',],
      addedby:[''],
      password:['',[Validators.required]],
      
      country:['',[Validators.required]],
      street:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      zip:['',[Validators.required]]
      
    });
  }
  checkboxChanged(item: any) {
    console.log("Checkbox changed:", item);
    // Update the permissionArray when the checkbox value changes
    for (const permission of this.permissionArray) {
      for (const data of permission.permission) {
        if (data === item) {
          // Update the 'acess' property of the clicked item
          data.acess = !data.acess;
          break; // No need to continue iterating once found
        } else {
          for (const dataval of data.subpermisson) {
            if (dataval === item) {
              // Update the 'acess' property of the clicked item in subpermisson
              dataval.acess = !dataval.acess;
              break; // No need to continue iterating once found
            }
          }
        }
      }
    }
    console.log("ddd",this.permissionArray)
  }
  
  updateCheckboxValue(data:any,event:any){
    console.log(data,event)
  }
  delete(val:any){
    this.dummy_json.splice(val,1)
  }
  deleteRole(data:any){
    this.roleJson.splice(data,1)
  }
  add(){
    debugger

    console.log(this.addForm)
    if(this.addForm.invalid){
      this.submitted=true;
      return;
    }
    else{
      if(this.addbutton){
        this.dummy_json.push(this.addForm.value)
        console.log("data",this.addForm.value)
      }
    else{
      this.dummy_json[this.editIndex].name=this.addForm.value.name;
      this.dummy_json[this.editIndex].displayName=this.addForm.value.displayName;
      this.dummy_json[this.editIndex].email=this.addForm.value.email;
      
    }
    }
document.getElementById('cncl')?.click()
  }
  get f() { return this.addForm.controls; }
  get g() { return this.roleForm.controls; }
dummy_json:any=[{name:"jitendra",displayName:"@user",contact:"+448744868687",email:"user@gmail",addedby:"jitendra",addedon:"23 jun 2023 11:00 pm",status:"Active",country:"India",street:"street number 2",city:"Noida",state:"U.P"},
{name:"Neha",displayName:"@user",contact:"+448744868687",email:"user@gmail",addedby:"jitendra",addedon:"23 jun 2023 11:00 pm",status:"Inactive",country:"India",street:"street number 2",city:"Noida",state:"U.P"},
{name:"Sandeep",displayName:"@user",contact:"+448744868687",email:"user@gmail",addedby:"jitendra",addedon:"23 jun 2023 11:00 pm",status:"Active",country:"India",street:"street number 2",city:"Noida",state:"U.P"},
{name:"Neha",displayName:"@user",contact:"+448744868687",email:"user@gmail",addedby:"jitendra",addedon:"23 jun 2023 11:00 pm",status:"Inactive",country:"India",street:"street number 2",city:"Noida",state:"U.P"},
{name:"Neha",displayName:"@user",contact:"+448744868687",email:"user@gmail",addedby:"jitendra",addedon:"23 jun 2023 11:00 pm",status:"Inactive",country:"India",street:"street number 2",city:"Noida",state:"U.P"}]

roleJson=[{roleName:"Billing",createdby:"Jitendra",permissionscount:"20",addedon:"15 May 2020 9:00 am",permissionArray:[{rolenames:"billing",permission:[
  {txt:"usermanagement",acess:true,subpermisson:[{text:"edit",acess:true
  },
  {
  text:"delete",
  acess:false
  },
  {
  text:"notification",
  acess:true
  }
  ]}]}]}]
  changestatus(event:any){
    debugger
    console.log(event.target.value)
    for(let i=0;i<this.dummy_json.length;i++){
      if(this.dummy_json[i].checked==true){
        this.dummy_json[i].status=event.target.value;
       }
    }

  }
  namediv=false;
  filtervalue:any
  showdivname(val:any){
this.namediv=!this.namediv;
this.filtervalue=val;
  }
  // filter for search
    name_srch="";
    namelist()
    {
      debugger
      if(this.filtervalue=="name"){
        this.dummy_json=  this.dummy_json.filter((x:any)=>{
          return x.name==this.name_srch
        })
      }
      else if(this.filtervalue=="displayname"){
this.dummy_json=  this.dummy_json.filter((x:any)=>{
          return x.displayName==this.name_srch
        })
      }
      else if(this.filtervalue=="emailid"){
        this.dummy_json=  this.dummy_json.filter((x:any)=>{
                  return x.email==this.name_srch
                })
              }
              else if(this.filtervalue=="phonenumber"){
                this.dummy_json=  this.dummy_json.filter((x:any)=>{
                          return x.contact==this.name_srch
                        })
                      }
                      else if(this.filtervalue=="status"){
                        this.dummy_json=  this.dummy_json.filter((x:any)=>{
                                  return x.status==this.name_srch
                                })
                              }
      this.namediv=false;
      
    }
   
}
