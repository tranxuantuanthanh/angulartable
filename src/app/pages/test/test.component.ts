import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataTypeName, IColumnInfo, IPagination } from 'src/app/components/table/table.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(protected httpClient: HttpClient) {
  }

  columnInfo: IColumnInfo[] = [{
    colName: 'chk',
    title: 'Check1',
    dataType: {
      typeName: DataTypeName.CHECKBOX,
      onClick: (...args) => {
        for (let i of args) {
          console.log(i);
        }
      }
    },
    headerType: {
      typeName: DataTypeName.CHECKBOX,
      isCheckAll: false,
    },
    width: '100px'
  },{
    colName: 'id',
    title: 'ID',
    dataType: {
      typeName: DataTypeName.BUTTON_LINK,
      onClick: (...args) => {
        for (let i of args) {
          console.log(i);
        }
      }
    },
    width: '100px'
  }, {
    colName: 'email',
    title: 'Email',
    dataType: {
      typeName: DataTypeName.TEXTAREA,
      onChange: (...args)=>{
        for(let i of args){
          console.log(i);
        }
      }
    },
    headerType: {
      typeName: DataTypeName.SORT,
      onClick: (...args) => {
        console.log(args[0]);
      }
    }
  }, {
    colName: 'first_name',
    title: 'Firstname',
    dataType: {
      typeName: DataTypeName.INPUT_NUMBER,
      onChange: (...args)=>{
        for(let i of args){
          console.log(i);
        }
      }
    }
  }, {
    colName: 'last_name',
    title: 'Lastname',
    dataType: {
      typeName: DataTypeName.INPUT_TEXT,
      onChange: (...args)=>{
        for(let i of args){
          console.log(i);
        }
      }
    }
  }, {
    colName: 'avatar',
    title: 'Avatar',
    dataType: {
      typeName: DataTypeName.DATEPICKER,
      onChange: (...args)=>{
        for(let i of args){
          console.log(i);
        }
      }
    },
    width: '100px'
  }]

  pagination: IPagination = {
    pageNum: 1,
    pageSize: 5,
    totalRecords: 1000,
    onPageChange: (pagination: IPagination)=>{
      console.log(pagination);
    }
  }

  tablelst: any = {};
  ngOnInit(): void {
    this.httpClient.get('https://reqres.in/api/users?page=2').subscribe({
      next: (res: any) => {
        this.tablelst = res;
        this.tablelst.data.map((item: any)=>({...item, chk: false }))
        console.log(this.tablelst)
      }
    });
  }
}
