/**
 * This is our line chart component, to be used through out our program
 */
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { ChartModule } from "primeng/chart";
/**
 * This is our component file of link-button component
 */
@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnInit {
  /**
   * chart data received from parent
   */
  @Input() chartData: any;
  /**
   * chart options received from parent
   */
  @Input() chartOptions: any;
  /**
   * graph label received from parent
   */
  @Input() graphLabel: string;
  /**
   * subscription
   */
  subscription: Subscription;
  /**
   *
   * @param messageService this service is used to display message to pur clients
   */
  constructor(private messageService: MessageService) {}
  /**
   * This is our life cycle hook implemented by the button component class
   */
  ngOnInit(): void {}
}
