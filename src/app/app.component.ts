import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [StatusBar]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar
  ) {
    this.initial();
  }

  initial() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#3171e0');
    });
  }
}
