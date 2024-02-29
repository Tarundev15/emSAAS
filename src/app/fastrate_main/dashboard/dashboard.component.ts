import { Component, OnInit, AfterViewInit, Inject, Renderer2, ViewChild, HostListener, ElementRef } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { CommonService } from 'src/app/_services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  @ViewChild('myInputField', { static: false }) myInputField: ElementRef | undefined;

  items = ['billing', 'address', 'aditional'];

  // Track the index of the item being dragged
  draggedItemIndex: number | null = null;
  currentDate: Date | undefined;


  constructor(

    private commonService: CommonService,

  ) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // aspectRatio: 9 / 10,
    plugins: [dayGridPlugin],
    height: 300,
    events: [
      { title: 'event 1', date: '2023-10-18' },
      { title: 'event 2', date: '2023-10-17' }
    ],
    // windowResize: function(arg) {
    //   alert('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);
    // },
    headerToolbar: {
      //left: 'dayGridMonth,timeGridDay',
      right: 'prev,next',
      // center: 'title',
    },

    eventClassNames: 'my-event',
    // headerClassNames: 'my-header', 
  };


  calendarOptions1: CalendarOptions = {
    // timeZone: 'UTC',
    //aspectRatio: 9 / 10,
    plugins: [dayGridPlugin, timeGridPlugin],
    events: [
      { title: 'event 1', date: '2023-10-18' },
      { title: 'event 2', date: '2023-10-17' }
    ],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    //themeSystem: 'bootstrap5',
    headerToolbar: {
      //left: 'dayGridMonth,timeGridDay',
      right: 'prev,next today',
      center: 'title',
    },
    //weekNumbers: true,
    dayMaxEvents: true, // allow "more" link when too many events
  };
  eventsPromise: Promise<EventInput> | undefined;
  userInfo: any;
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }

  ngOnInit(): void {
    // You can call getcalender() here if needed
    //this.getcalender();
    this.currentDate = new Date();
  }


  dragStarted(event: DragEvent, index: number): void {
    this.draggedItemIndex = index;
    // Set the data to be transferred during the drag operation (optional)
    event.dataTransfer?.setData('text/plain', JSON.stringify({ index }));
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: DragEvent, targetIndex: number): void {
    event.preventDefault();
    if (this.draggedItemIndex !== null) {
      // Move the item within the array
      const draggedItem = this.items[this.draggedItemIndex];
      this.items.splice(this.draggedItemIndex, 1);
      this.items.splice(targetIndex, 0, draggedItem);
    }
    this.draggedItemIndex = null;
  }

  dragEnded(): void {
    this.draggedItemIndex = null;
    console.log("data", this.items)
  }
  onCtrl2Pressed() {
    console.log('Ctrl+2 was pressed');

    // Add your logic here
  }

  // Listen for the keydown event on the host element
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Check if Ctrl and 2 keys are pressed simultaneously
    if (event.ctrlKey && event.key === '2' && this.myInputField?.nativeElement) {
      event.preventDefault();
      this.myInputField.nativeElement.focus();
      this.onCtrl2Pressed();
    }
  }

  // getcalender(){
  //   console.log("calender");
  //   document.addEventListener('DOMContentLoaded', () => {
  //     const calendarEl = document.getElementById('calendar');
  //     if (calendarEl) {
  //       const calendar = new Calendar(calendarEl, {
  //         initialView: 'dayGridMonth'
  //       });
  //       calendar.render();
  //     }
  //   });
  // }
  async getuseraccount() {
    this.userInfo = await this.commonService.GetUser().toPromise();
    //localStorage.setItem('userInfo---getaccount',this.userInfo);
    console.log("this.userInfo1111-=-=.", this.userInfo);

  }

  policy(event: any){
    alert('nn');
    var addUserLink = document.getElementById('addUserLink');

    // Add a click event listener to the link
    addUserLink?.addEventListener('click', function() {
        // Open the link in a new web view
        window.open('https://emanager.supraesapp.com/eManagerWeb/viewCompanyNotificationDoc?notificationid=22', '_blank');
    });
  }
  
}






