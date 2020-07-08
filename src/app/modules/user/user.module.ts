import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { required } from '@rxweb/reactive-form-validators';

export class User{
 
        private userId: number;
        public get _userId(): number {
                return this.userId;
        }
        public set _userId(value: number) {
                this.userId = value;
        }
        public logo: string;
        public get _logo(): string {
                return this.logo;
        }
        public set _logo(value: string) {
                this._logo = value;
        }
        private fullName: string;
        public get _fullName(): string {
                return this.fullName;
        }
        public set _fullName(value: string) {
                this.fullName = value;
        }
        private isValid: number;
        public get _isValid(): number {
                return this.isValid;
        }
        public set _isValid(value: number) {
                this.isValid = value;
        }
        private nomClient: string;
        public get _nomClient(): string {
                return this.nomClient;
        }
        public set _nomClient(value: string) {
                this.nomClient = value;
        }
        private registrationDate: Date;
        public get _registrationDate(): Date {
                return this.registrationDate;
        }
        public set _registrationDate(value: Date) {
                this.registrationDate = value;
        }
        private username: string; 
        public get _username(): string {
                return this.username;
        }
        public set _username(value: string) {
                this.username = value;
        }
        //@required()
        private email: string; 
        public get _email(): string {
                return this.email;
        }
        public set _email(value: string) {
                this.email = value;
        }
        private lastLogin: Date;
        public get _lastLogin(): Date {
                return this.lastLogin;
        }
        public set _lastLogin(value: Date) {
                this.lastLogin = value;
        }
        private category: number;
        public get _category(): number {
                return this.category;
        }
        public set _category(value: number) {
                this.category = value;
        }
        private pw: number;
        public get _pw(): number {
                return this.pw;
        }
        public set _pw(value: number) {
                this.pw = value;
        }
        private contact: number;
        public get _contact(): number {
                return this.contact;
        }
        public set _contact(value: number) {
                this.contact = value;
        }
        private master: number;
        public get _master(): number {
                return this.master;
        }
        public set _master(value: number) {
                this.master = value;
        }
    constructor()  {}
         
      
}

