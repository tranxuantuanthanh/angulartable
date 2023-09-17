import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export enum DataTypeName {
  NORMAL = 'normal',
  INPUT_TEXT = 'inputText',
  INPUT_NUMBER = 'inputNumber',
  DROPDOWN = 'dropdown',
  BUTTON = 'button',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  TIME = 'time',
  DATETIME = 'datetime',
  TEXTAREA = 'textarea',
  BUTTON_LINK = 'buttonLink',
  SORT = 'sort',
  LINK = 'link',
  FILE = 'file',
  IMAGE = 'image',
  RADIO = 'radio',
  DATEPICKER = 'datepicker',
  DATEPICKER_RANGE = 'datepickerRange',
}

export enum TextAlign {
  LEFT = 'text-start',
  CENTER = 'text-center',
  RIGHT = 'text-end',
}

export enum SortType {
  NO = '',
  ASC = 'asc',
  DESC = 'desc',
}

export interface ITitleInfo {
  title?: string;
  colSpan?: number;
  rowSpan?: number;
}

export interface IDropdownData {
  value: any;
  name: any;
}

export interface IType {
  typeName: DataTypeName;
  maxLength?: number;
  textAlign?: TextAlign;
  onChange?: (...args: any) => void;
  onClick?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  onFocus?: (...args: any) => void;
  dropdownList?: IDropdownData[];
}

export interface IHeaderType {
  typeName: DataTypeName;
  sortType?: SortType;
  onClick?: (...args: any) => void;
  isCheckAll?: boolean;
}

export interface IColumnInfo {
  title?: string;
  titles?: ITitleInfo[];
  colName: string;
  dataType: IType;
  width?: string;
  hidden?: boolean;
  headerType?: IHeaderType;
}

export interface IPagination {
  pageSize: number;
  pageNum: number;
  totalRecords: number;
  onPageChange: (pagination: IPagination) => void;
  // paginationDescription: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnChanges {
  // Parameter from parent
  @Input() headerRowNum: number = 1;
  @Input() columnInfo!: IColumnInfo[];
  @Input() data: any[] = [];
  @Input() maxHeight: any | string;
  @Input() pagination!: IPagination;

  public get DataTypeName(): typeof DataTypeName {
    return DataTypeName;
  }

  ngOnChanges(changes: SimpleChanges) {
    let columns = [];
    for (let col of this.columnInfo) {
      columns.push(col.colName);
    }
    this.displayedColumns = columns;
    console.log(this.displayedColumns);
  }

  onChange(columnInfo: IColumnInfo, row: any, data: any) {
    if (columnInfo.dataType.onChange) {
      columnInfo.dataType.onChange(columnInfo, row, data);
    }
  }

  onClick(columnInfo: IColumnInfo, row: any, data: any) {
    if (columnInfo.dataType.onClick) {
      columnInfo.dataType.onClick(columnInfo, row, data);
    }
  }

  onBlur(columnInfo: IColumnInfo, row: any, data: any) {
    if (columnInfo.dataType.onBlur) {
      columnInfo.dataType.onBlur(columnInfo, row, data);
    }
  }

  onFocus(columnInfo: IColumnInfo, row: any, data: any) {
    if (columnInfo.dataType.onFocus) {
      columnInfo.dataType.onFocus(columnInfo, row, data);
    }
  }

  onClickSortHeader(columnInfo: IColumnInfo) {
    if (columnInfo.headerType) {
      if (
        columnInfo.headerType.sortType == undefined ||
        columnInfo.headerType.sortType == SortType.NO
      ) {
        columnInfo.headerType.sortType = SortType.ASC;
      } else if (columnInfo.headerType.sortType == SortType.ASC) {
        columnInfo.headerType.sortType = SortType.DESC;
      } else {
        columnInfo.headerType.sortType = SortType.NO;
      }
      if (columnInfo.headerType.onClick) {
        columnInfo.headerType.onClick(columnInfo);
      }
    }
  }

  updateAllChecked(columnInfo: IColumnInfo) {
    if (columnInfo.headerType) {
      columnInfo.headerType.isCheckAll =
        this.data && this.data.every((t) => t[columnInfo.colName]);
    }
  }

  someChecked(columnInfo: IColumnInfo): boolean {
    if (columnInfo.headerType) {
      if (this.data == null) {
        return false;
      }
      return (
        this.data.filter((t) => t[columnInfo.colName]).length > 0 &&
        !columnInfo.headerType.isCheckAll
      );
    }
    return false;
  }

  setAll(columnInfo: IColumnInfo, checked: boolean) {
    if (columnInfo.headerType) {
      columnInfo.headerType.isCheckAll = checked;
      if (this.data == null) {
        return;
      }
      this.data.forEach((t) => (t[columnInfo.colName] = checked));
    }
  }

  handlePageEvent($event: any) {
    if (this.pagination) {
      this.pagination.onPageChange({
        ...this.pagination,
        pageNum: $event.pageIndex + 1,
        pageSize: $event.pageSize,
        totalRecords: $event.length,
      });
    }
  }

  displayedColumns: string[] = [];
}
