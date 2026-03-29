import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Card } from 'primeng/card';
import { ServicesService } from '../../../core/services/services.service';
import { IServicesObject } from '../../../core/models/services-schemas/services-schemas';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-home',
  imports: [
    ChartModule,
    Card
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private servicesService = inject(ServicesService)
  private cdr = inject(ChangeDetectorRef)

  servicesList = signal<IServicesObject[]>([])
  servicesInfra = signal<number>(0);
  pieChartData1: any = null
  pieChartData2: any = null
  barChartData: any = null

  pieChartOptions: any = null
  barChartOptions: any = null

  pieChartPlugins: any[] = []

  ngOnInit(): void {
    this.pieChartPlugins = [ChartDataLabels]
    this.servicesService.getAll().subscribe({
      next: (data) => {
        this.servicesList.set(data);
        this.servicesInfra.set(
          data.filter((e) => e.category === 'Infra').length
        )

        this.initCharts()
        this.cdr.detectChanges()
      }
    })
  }

  initCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    const infra = this.servicesList().filter((e) => e.category === 'Infra').length
    const acesso = this.servicesList().filter((e) => e.category === 'Acesso').length
    const software = this.servicesList().filter((e) => e.category === 'Software').length
    const conexao = this.servicesList().filter((e) => e.category === 'Conexão').length

    this.pieChartData1 = {
      labels: ['Infra', 'Acesso', 'Software', 'Conexão'],
      datasets: [
        {
          data: [infra, acesso, software, conexao],
          backgroundColor: [
            '#1E3A8A',
            '#1D4ED8',
            '#2563EB',
            '#60A5FA'
          ],
          hoverBackgroundColor: [
            '#172554',
            '#1E40AF',
            '#1D4ED8',
            '#3B82F6'
          ]
        }
      ]
    }

    const aberto = this.servicesList().filter((e) => e.status === 'Aberto').length
    const emAtendimento = this.servicesList().filter((e) => e.status === 'Em atendimento').length
    const Finalizado = this.servicesList().filter((e) => e.status === 'Finalizado').length
    const Cancelado = this.servicesList().filter((e) => e.status === 'Cancelado').length

    this.pieChartData2 = {
      labels: ['Aberto', 'Em andamento', 'Finalizado', 'Cancelado'],
      datasets: [
        {
          data: [aberto, emAtendimento, Finalizado, Cancelado],
          backgroundColor: ['#F59E0B', '#3B82F6', '#22C55E', '#EF4444'],
          hoverBackgroundColor: ['#FBBF24', '#60A5FA', '#4ADE80', '#F87171']
        }
      ]
    };

    this.pieChartOptions = {
      plugins: {
        legend: {
          labels: {
            generateLabels: (chart: any) => {
              const data = chart.data

              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i]

                return {
                  text: `${label} (${value})`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  index: i,
                  fontColor: '#9CA3AF'
                }
              })
            }
          }
        },
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold',
            size: 12
          },
          formatter: (value: number, context: any) => {
            const data = context.chart.data.datasets[0].data;
            const total = data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(0);
            return `${percentage}%`;
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }
}