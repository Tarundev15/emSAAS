import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/_services/toast.service';
import { MessageType } from 'src/app/_models/globalEnum';
// import { blockReloadInHiddenIframes } from '@azure/msal-browser/dist/utils/BrowserUtils';

@Component({
  selector: 'app-toastmessage',
  templateUrl: './toastmessage.component.html',
  styleUrls: ['./toastmessage.component.css']
})

export class ToastmessageComponent implements OnInit {
  data: any;
  messagType: any = MessageType;
  isinfo: boolean = false;
  iswarn: boolean = false;
  iserror: boolean = false;
  toastTypeMap: { [key: string]: MessageType } = {
    "ATMCMN-01_INFO-M": MessageType.Information,
    "CMN-INFORMATION-M": MessageType.Information,  // these are old data format
    "ATMCMN-02_ALERT-M": MessageType.Warning,
    "CMN-ALERT-M": MessageType.Warning,
    "ATMCMN-03_WARN-M": MessageType.Warning,
    "ATMCMN-04_ERROR-M": MessageType.Error,
    "CMN-ERROR-M": MessageType.Error,
  };
  toastType: any = MessageType;
  constructor(public toastService: ToastService) {
  }
  ngOnInit() {
    this.toastService.getToasts().subscribe((toasts) => {
      this.data = toasts;
      if (this.data.length > 0) {
        this.toastType = this.toastTypeMap[this.data[0]?.msgType];
        if (this.toastType == this.messagType.Information) {
          this.isinfo = true
          this.iswarn=false;
          this.iserror=false;
        }
        else if(this.toastType == this.messagType.Warning)
        {
          this.iswarn=true;
          this.isinfo = false
          this.iserror=false;
        }
        else if(this.toastType == this.messagType.Error)
        {
          this.iserror=true;
          this.iswarn=false;
          this.isinfo = false
        }
        setTimeout(() => {
          this.remove()
        }, 5000);
      }
    });

  }


  remove() {
    this.isinfo = false;
    this.iserror = false;
    this.iswarn = false;
    this.toastService.removeToast(0);
  }
}
