import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, ToastController, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonInput, IonGrid, IonDatetime, IonCol, IonRow, IonSelectOption, IonFooter, IonButton, IonIcon, IonAlert } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [IonAlert, IonIcon, IonButton, IonFooter, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonMenuButton, IonButtons, ReactiveFormsModule, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonInput, IonGrid, IonDatetime, IonSelectOption]
})
export class ReservaPage implements OnInit {
[x: string]: any;


  reservaForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telefone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    pessoas: new FormControl(2, [Validators.min(1)]),
    preferencia: new FormControl(''),
    ocasiao: new FormControl(''),
    observacoes: new FormControl('')
  });

  constructor(private toastClrtl: ToastController) { }

  async confirmaReserva() {
    if (this.reservaForm.valid) {
      this.mostrarToast('Preencha todos os campos obrigatórios!');
      return;
    }
    const novaReserva = {
      ...this.reservaForm.value,
      criadaEm: new Date().toISOString(),
    }
    const reservasSalvas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservasSalvas.push(novaReserva);

    localStorage.setItem('reservas', JSON.stringify(reservasSalvas));
    await this.mostrarToast('Reserva realizada com sucesso!');

    this.reservaForm.reset({
      pessoas: 2
    })
  }
  async mostrarToast(msg: string) {
    const toast = await this.toastClrtl.create({
      message: msg,
      duration: 2000, // em milesimos de segundos 
      color: 'primary',
      position: 'middle'
    });
    toast.present();
  }
  ngOnInit() {
  }

}
