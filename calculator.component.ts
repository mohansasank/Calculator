import { Component, OnInit } from '@angular/core';
import {history} from '../history_schema';
import { Router } from '@angular/router';
import { Service1Service } from '../service1.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  History:history[]=[];
  operand_1:string;
  operand_2:string;
  operatortest:string;
  ans:string;

  constructor(public service:Service1Service, public  route:Router) { }

  ngOnInit() {
  }

  public getNumber(v: string){
    console.log(v);
    if(this.operand_1 ===null){
    this.operand_1=v;
    console.log(this.operand_1)
    }
    else{
      this.operand_2=v;
      console.log(this.operand_2)
    }
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
    }
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '=':
      return secondOp;
    }
  }
  public getOperation(op: string){
    console.log(op);
    this.operatortest=op;
    console.log(this.operatortest);

    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
    this.ans=this.firstOperand;
    console.log(this.ans);
    var arr={
        operand_1:this.operand_1,
        operator:this.operator,
        operand_2:this.operand_2,
        ans:this.ans
    };
    this.History.push(arr);
  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
    this.operand_1=null;
    this.operand_2=null;
    this.operator=null;
    this.ans=null;
  }
   navigate(){
     this.service.hist=this.History;
     this.route.navigate(['history']);
   }
}