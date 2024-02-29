import { JsonPipe } from '@angular/common';
import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';
import { ToastService } from 'src/app/_services/toast.service';
import { LangPipe } from 'src/app/pipe/pipe';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  @Input() advanceTxt: any;
  @Output()searchparamid: EventEmitter<string> = new EventEmitter();
  @Output()close: EventEmitter<string> = new EventEmitter();
  myForm: FormGroup;
  toastMsgObj:any;
  constructor(private fb: FormBuilder,private common:CommonService,
    private toastService:ToastService,
		private lang:LangPipe) {
   
    this.myForm = this.fb.group({
      students: this.fb.array([this.createStudentFormGroup()]) // Initial student added
    });
  }
  closefn(){
    localStorage.removeItem('adsearch');
    this.close.emit()
  }
  userId=''
  showModal:boolean=false;
  namelist:any=[]
  getsearchListName(){
    this.common.searchsavedName(this.userId,this.advanceTxt).subscribe(
      (response: any) => {
      this.namelist=response.data[0]
       
      },
      (error: any) => {
        
      }
    );
  }
  searchFinalData:any=[];
  savedId='';
  bynameId=''
  searchByName(e:any){
   
   this.common.getsavedUseradvancedata(this.userId,e.target.value).subscribe(
    (response: any) => {
      this.showModal=true;
      this.searchFinalData=response.data[0];
      this.savedId=e.target.value;
     
      this.myForm = this.fb.group({
        students: this.fb.array([]) // Initial student added
      });
        for (const data of this.searchFinalData) {
      this.addStudentWithInitialData(data);
    }
    },
    (error: any) => {
      
    }
  );
  }
  delete(){
   

    this.common.deleteSavedSearch(this.userId,this.savedId).subscribe(
      (response: any) => {
        this.toastMsgObj = {
          msgType: 's',
          msgText: this.lang.transform(response.responseCode)
          }
          this.toastService.addToast(this.toastMsgObj);
       
       this.closeedit();
       this.getsearchListName();
      
       
      },
      (error: any) => {
        
      }
    );
  }
  searchFinal(){

  }
  showModaledit(){
    this.showModal=true;
    this.updateflag=true;
    this.getsearchListName();
  }
  closeedit(){
    this.showModal=false;
    this.updateflag=false;
    this.searchName='';
    this.savedId='';
    this.myForm.reset();
    this.myForm = this.fb.group({
      students: this.fb.array([this.createStudentFormGroup()]) // Initial student added
    });
  }
  searchflag:boolean=false;
  search(){
    
    let obj={
      id:this.savedId,
      searchflag:true
    }
    localStorage.setItem('adsearch',JSON.stringify(obj))
   this.searchflag=true;
   this.updateflag=false;
    this.searchparamid.emit(this.savedId);
    this.closeedit();
    this.close.emit()
  }
  ngOnInit() {
 

    this.getclmn(this.advanceTxt);
    let data:any;
     data= localStorage.getItem('currentUser');
data=JSON.parse(data)
    this.userId=data.userId;

    this.getcndsn();
    this.getsearchListName();
    let data1:any =(localStorage.getItem('adsearch'))
    data1=JSON.parse(data1)
    if(data1?.id){
      this.common.getsavedUseradvancedata(this.userId,data1.id).subscribe(
        (response: any) => {
          this.showModal=true;
          this.searchFinalData=response.data[0];
         
          this.savedId=data1.id
         
          this.myForm = this.fb.group({
            students: this.fb.array([]) // Initial student added
          });
            for (const data of this.searchFinalData) {
          this.addStudentWithInitialData(data);
        }
        },
        (error: any) => {
          
        }
      );
    }

    // for (const data of this.initialData) {
    //   this.addStudentWithInitialData(data);
    // }
  }
  // Getter to access the students FormArray
  get studentsFormArray(): FormArray {
    return this.myForm.get('students') as FormArray;
  }
  selectColomnList:any=[];
  getclmn(data:any){
  this.common.getcoloumn(data).subscribe(
    (response: any) => {
    
      this.selectColomnList=response.data[0];
    },
    (error: any) => {
      
    }
  );
  }
  searchName:any=''
  cndsnList:any=[];
  savesearchvaldation:boolean=false;
  submitted:boolean=false;
  createStudentFormGroup(): FormGroup {
    return this.fb.group({
      column: ['', Validators.required],
      condition: ['', Validators.required],
      value: ['', Validators.required],
      opretor:['AND',],

    });
  }
  saveSearch(){
  
    this.savesearchvaldation=false;
    this.submitted=false;
 
 
   
    if(this.myForm.invalid){
      this.submitted=true;
      return;
    }
    else{
      if(!this.updateflag){
        if(this.searchName=='' || this.searchName==undefined){
          this.savesearchvaldation=true;
          
          return ;
         }
      }
      let obj={
        "savedSearchId": 0,
    "userId": this.userId,
    "searchName":this.searchName,
    "pageKey": this.advanceTxt,
    "createdBy": 0,
    "lastUpdatedBy": 0,
    savedSearchDetail: []
      }
      let data:any=[];
  for(let i=0;i<this.myForm.value.students.length;i++){
    let dummyobj={
      
        "savedSearchDetailId": 0,
        "savedSearchId": 0,
        "searchAvailableColumnId": this.myForm.value.students[i].column,
        "searchConditionId": this.myForm.value.students[i].condition,
        "savedSearchValue": this.myForm.value.students[i].value,
        "searchCondition": this.myForm.value.students[i].opretor,
      
    }
   data.push(dummyobj);
   
  
  }
  if(this.updateflag){
    obj.savedSearchId= Number(this.savedId);
  }
  obj.savedSearchDetail=data;
      this.common.savesrchAdvance(obj,this.userId).subscribe(
        (response: any) => {
          
          if(response?.responseCode){
            this.toastMsgObj = {
              msgType: 's',
              msgText: this.lang.transform(response.responseCode)
              }
              this.toastService.addToast(this.toastMsgObj);
           
          }
          this.savedId=response.data[0][0].savedSearchId;
          this.getsearchListName();
       
        
       
        },
        (error: any) => {
          
        }
      );
    }
   
   
  }
  saveandSearch(){
 
    if(!this.updateflag){
      if(this.searchName=='' || this.searchName==undefined){
        this.savesearchvaldation=true;
        
        return ;
       }
       else{
        this.savesearchvaldation=false;
       }
    }
    this.saveSearch();
    if(this.myForm.valid){
      setTimeout(()=>{
        this.common.getsavedUseradvancedata(this.userId,this.savedId).subscribe(
          (response: any) => {
            this.showModal=true;
            this.searchFinalData=response.data[0];
            this.savedId=this.savedId;
          
            this.myForm = this.fb.group({
              students: this.fb.array([])
            });
              for (const data of this.searchFinalData) {
            this.addStudentWithInitialData(data);
          }
          },
          (error: any) => {
            
          }
        );
        this.search()
      },3000)
    }
 
  
  }
  getcndsn(){
    this.common.getcndsn().subscribe(
      (response: any) => {
      
        this.cndsnList=response.data[0];
      },
      (error: any) => {
        
      }
    );
    }
  
  addStudent(): void {
    this.studentsFormArray.push(this.createStudentFormGroup());
  }

  
  removeStudent(index: number): void {
    if (this.studentsFormArray.controls.length > 1) {
      this.studentsFormArray.removeAt(index);
    }
  }

  // Create a FormGroup for a single student

  addStudentWithInitialData(data: any): void {
    
    const studentFormGroup = this.createStudentFormGroup();
    studentFormGroup.controls['column'].setValue(data.searchAvailableColumnId);
    studentFormGroup.controls['condition'].setValue(data.searchConditionId);
    studentFormGroup.controls['value'].setValue(data.savedSearchValue);
    studentFormGroup.controls['opretor'].setValue(data.searchCondition);
    // studentFormGroup.patchValue(data);
    this.studentsFormArray.push(studentFormGroup);
  }
   initialData = [
    { column: 1, condition: 2, value: 'value' },
    { column: 1, condition:2, value: 'value' }
  ];
  // Submit the form
  onSubmit(): void {
    if (this.myForm.valid) {
   
      // Handle form submission here
    } else {
      // Form is invalid, display error or do something
    }
  };
  updateflag:boolean=false
  update(){
  
this.updateflag=true;
let data=this.namelist.find((x:any)=>{return x.savedSearchId===Number(this.savedId)})

this.searchName=data.searchName;
this.saveSearch();
  }
  search_save(){
    this.updateflag=true;
let data=this.namelist.find((x:any)=>{return x.savedSearchId===Number(this.savedId)})

this.searchName=data.searchName;
this.saveSearch();
setTimeout(() => {
  this.search()
}, 2000);
  }
}