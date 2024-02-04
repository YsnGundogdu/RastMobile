import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocialMediaAccount } from './models/social-media-account';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule, SearchPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  modalIsOpen:boolean = false;

  socialMediaAccounts:SocialMediaAccount[] = [];

  myForm:FormGroup;
  filterText:string='';
  constructor(
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.createMyForm();
    // let storageData = localStorage.getItem('SocialMediaAccounts');
    let storageData;

    // Kodun tarayıcı ortamında çalışıp çalışmadığını kontrol etmek için
    if (typeof window !== 'undefined' && window.localStorage) {
      storageData = localStorage.getItem('SocialMediaAccounts');
    }

    // Eğer depolama verisi mevcutsa ve boş bir dizi değilse, onu kullan
    if (storageData) {
      const parsedData = JSON.parse(storageData);

      // Eğer parse edilmiş veri mevcut ve boş bir dizi değilse, kullan
      if (parsedData && parsedData.length > 0) {
        this.socialMediaAccounts = parsedData;
      } else {
        // Parse edilmiş veri null veya boş bir dizi ise, varsayılan değerleri kullan
        this.socialMediaAccounts = [
          { link: "instagram.com/mobilerast/", name: "instagram", description: "Geliştirme projenizi başarıyla tamamlamanıza yardımcı olacağız." },
          { link: "tr.linkedin.com/company/rastmobile", name: "linkedin", description: "Rast Mobile'dan denetlenmiş geliştiricileri işe alarak teknik projelerinizi ölçeklendirin." },
          { link: "behance.net/rastmobile", name: "behance", description: "Yazılım Geliştirme Ajansı Rast Mobile Bilgi Teknolojileri Ltd. Şti." },
          { link: "twitter.com/rastmobile", name: "twitter ", description: "Yazılım Geliştirme Ajansı Rast Mobile Bilgi Teknolojileri Ltd. Şti." },
        ];
      }
    } else {
      // Eğer depolama verisi null ise, varsayılan değerleri kullan
      this.socialMediaAccounts = [
        { link: "instagram.com/mobilerast/", name: "instagram", description: "Geliştirme projenizi başarıyla tamamlamanıza yardımcı olacağız." },
        { link: "tr.linkedin.com/company/rastmobile", name: "linkedin", description: "Rast Mobile'dan denetlenmiş geliştiricileri işe alarak teknik projelerinizi ölçeklendirin." },
        { link: "behance.net/rastmobile", name: "behance", description: "Yazılım Geliştirme Ajansı Rast Mobile Bilgi Teknolojileri Ltd. Şti." },
        { link: "twitter.com/rastmobile", name: "twitter ", description: "Yazılım Geliştirme Ajansı Rast Mobile Bilgi Teknolojileri Ltd. Şti." },
      ];
    }
  }
  
  openModal(){
    this.modalIsOpen = true; // Yeni Hesap Eklemek İçin Modalın Açılmasını Sağlar
  } 
  
  closeModal(){
    this.modalIsOpen = false; // Yeni Hesap Eklemek İçin Açılan Modalın Kapatılmasını Sağlar
  }

  createMyForm(){
    this.myForm = this.formBuilder.group({ // Form Oluşturuldu Ve Kurallar Yazıldı
      link:['', Validators.required],
      name:['', Validators.required],
      description:['', Validators.required]
    })
  }

  saveAccount(){ // Form Alanlarına Girilen Bilgiler Tabloda Gösterilmesi İçin Array'e Eklendi, Modal Kapatıldı Ve Form Resetlendi
    if (this.myForm.valid) {
      this.socialMediaAccounts.push({
        link:this.myForm.value.link,
        description: this.myForm.value.description,
        name:this.myForm.value.name
      })
      
      localStorage.setItem('SocialMediaAccounts', JSON.stringify(this.socialMediaAccounts))
      this.modalIsOpen = false;
      this.myForm.reset();
    }
  }


}
