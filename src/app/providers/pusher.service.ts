import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare const Pusher: any;
@Injectable()
export class PusherServiceProvider {
  channel;
  constructor(public http: HttpClient) {

  }
  public init(uuid) {
    const pusher = new Pusher('3e1e4ea4e682c0c4bad7', {
      cluster: 'us2',
      encrypted: true,
    });
    this.channel = pusher.subscribe(uuid);
    return this.channel;
  }
}
