import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../upload.service';


import { Achievement, Team, TeamsService } from './../data/team.service';
import { AchievementsService } from './../data/achievements.service';

@Component({
  selector: 'app-uploadphotos',
  templateUrl: './uploadphotos.component.html',
  styleUrls: ['./../../assets/css/main.css',
              './uploadphotos.component.css', ]
})
export class UploadphotosComponent implements OnInit {

  DJANGO_SERVER = 'http://127.0.0.1:8000'
  form: FormGroup;
  team: Team;
  achievement: Achievement;
  response;
  imageURL;


  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        photos: [''], defis: [''], equipe: ['']
      });

  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('photos').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('photos').value);

    this.uploadService.upload(formData).subscribe(
      (res) => {
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
    
    this.achievement = new Achievement();
    this.achievement.name = this.form.get('defis').value;
    this.achievement.points = 5;

    this.team = new Team();
    this.team.name = this.form.get('equipe').value;

    this.uploadService.addNamePicture(this.achievement, this.team, formData).subscribe(
      (res) => {
        console.log("added");
      },
      (err) => {  
        console.log(err);
      }
    ); 
   
  }

 
}



