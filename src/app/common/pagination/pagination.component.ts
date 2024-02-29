import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  @Input() currentPage:any;
  @Input() totalPages: any;
  @Output() pageChange = new EventEmitter<number>();
  @Output() showResults = new EventEmitter<number>();
  @Input() totalPagesArray: any = [];
  @Input () itemsPerPage:any;
  @Input () totalRecords:any;
  page: number = 1;

  ngOnInit() {
  
  }
  
  generateTotalPagesArray() {
    const maxPageButtons = 5;

    if (this.totalPages <= maxPageButtons) {

      this.totalPagesArray = Array.from(
        { length: this.totalPages },
        (_, i) => i + 1
      );
    } else {

      let startPage = Math.max(
        this.currentPage - Math.floor(maxPageButtons / 2),
        1
      );
      if (this.totalPages - startPage < maxPageButtons - 1) {
        startPage = this.totalPages - maxPageButtons + 1;
      }
      let endPage = Math.min(startPage + maxPageButtons - 1, this.totalPages);

      this.totalPagesArray = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      );
    }
  }
  perPageShow(event:any){
    this.page=1;
    this.itemsPerPage=event.target.value;
    this.showResults.emit(this.itemsPerPage);
  }
  perPage(pageNo:any){
    this.page=pageNo;
    this.pageChange.emit(this.page);
  }
  calculateStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }
  calculateEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalRecords);
  }
}
