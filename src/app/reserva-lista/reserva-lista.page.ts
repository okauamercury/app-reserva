import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, AlertController, IonMenuButton, IonList, IonItem, IonLabel, IonFooter, IonSkeletonText, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { style } from '@angular/animations';

@Component({
  selector: 'app-reserva-lista',
  templateUrl: './reserva-lista.page.html',
  styleUrls: ['./reserva-lista.page.scss'],
  standalone: true,
  imports: [IonText, IonSkeletonText, IonFooter, IonLabel, IonItem, IonList, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class ReservaListaPage implements OnInit {
[x: string]: any;
  reservas: any []=[]  

  constructor(private router: Router, private alertCtl: AlertController) { }
ionViewWillEnter(){   // hook = elemento do ciclo de vida do ionic, equivale a um evento no C#
  this.loadReservas();
 
}
loadReservas(){
  const data = localStorage.getItem('reservas'); // obtem item
  this.reservas = data ? JSON.parse(data) : []; // converte de string para objeto

}
editar(id:number){
  this.router.navigate(['/editar-reserva', id]); // $_GET[]
}
async excluir(id :number){
 const alert = await this.alertCtl.create({
  header: "Excluir reserva?",
  message: "Deseja realmente excluir a reserva?",
  buttons: [
    {text: 'Cancelar', role: 'cancel'},
    
    {text: 'Excluir', 
      handler: () => {
        this.reservas = this.reservas.filter(r => r.index !== id)
        localStorage.setItem('reservas', JSON.stringify(this.reservas));
      }
    }
  ]
 });
 await alert.present();
}

  ngOnInit() {  // hook equivale a um evento (click, mouse up, load)
  }

}
