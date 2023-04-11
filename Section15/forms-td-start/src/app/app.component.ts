import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  @ViewChild('f') signupForm: NgForm
  defaultQuestion = "pet"
  answer: string = 'PIPI';
  genders = ['male', 'female'];
  submitted : boolean = false
  user : {
    username : 'Madalin',
    email: '123 ',
    secretQuestion: '213 ',
    answer: '2131 ',
    gender: '12312 '
  }


  ngOnInit(): void {
  }
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData:{
    //     username : suggestedName,
    //     email: ''
    //   },
    //   secret : 'pet',
    //   questionAnswer : '',
    //   gender: 'male'
    // })
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  // onSubmit(form : NgForm) {
  //   console.log(form)
  // }

  onSubmit() {
    this.user.username=this.signupForm.value.username
    this.user.email=this.signupForm.value.userData.email
    this.user.secretQuestion=this.signupForm.value.secret
    this.user.answer=this.signupForm.value.questionAnswer
    this.user.gender = this.signupForm.value.gender
    this.submitted = true
  }
}
