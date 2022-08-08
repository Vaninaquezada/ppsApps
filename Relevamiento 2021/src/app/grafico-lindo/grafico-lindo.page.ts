import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../servicios/auth.service';
import { BaserelevamientoService } from '../servicios/baserelevamiento.service';

@Component({
  selector: 'app-grafico-lindo',
  templateUrl: './grafico-lindo.page.html',
  styleUrls: ['./grafico-lindo.page.scss'],
})
export class GraficoLindoPage implements OnInit {

  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  hay = true;
  valueBarsChart: any;
  chartData = null;
  listaVotos: any;
  myChart: Chart;
  imagenes = [];
  fotos = [];
  data = [];
  datacolor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255,1)',
    'rgba(255, 159, 64, 1)'

  ];
  imagen = '';
  constructor(private votos: BaserelevamientoService, private router: Router, private authSvc: AuthService) {
    Chart.register(...registerables);
    this.getVotaciones();
    this.votos.getImagenes().subscribe(fotos => {
      this.fotos = fotos;
    });
  }
  ngOnInit() {

  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {

    setTimeout(() => {
      this.getLindo();
    }, 1500);
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: 'pie',
      data: {
        datasets: [{
          data: [],
          backgroundColor: this.datacolor,
          borderColor: [
            'rgba(255, 99, 132, 0)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }
        },

        onClick: (e, i) => {
          console.log(i);
          this.onBarClicked(i);
        }
      }
    });
  }
  onBarClicked(i: any) {
    this.hay = false;
    console.log('company = ' + i[0].index);
    this.imagen = this.imagenes[i[0].index].imagen;
    console.log('"vs"', this.imagenes[i[0].index].imagen);
  }
  getVotaciones() {
    this.votos.getVotacion().subscribe(fotos => {

      this.listaVotos = fotos;
    });
  }

  getLindo() {
    console.log('"foto ', this.fotos);
    this.fotos.forEach(element => {
      if (element.tipo === 'linda') {
        console.log('"fotos lindas', element);
        console.log('holis - ');
        this.imagenes.push(element);
        this.data.push(element.votacion.length);
        this.addDataToChart(this.valueBarsChart, '', element.votacion.length);
      }
    });

  }


  addDataToChart(chart, label, data) {
    console.log('chart - ' + data);
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
      //   chart.data.labels.push('');
      //  dataset.data = data;
    });

    console.log('charti - ' + JSON.stringify(this.valueBarsChart.data));
    chart.update();
  }
  async singOut() {
    console.log('hola');
    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }

}
