import {Injectable} from '@angular/core';
import {XHR} from '@angular/compiler';
import {
  FnArg,
  UiArguments,
  ClientMessageBroker,
  ClientMessageBrokerFactory
} from '@angular/platform-browser';
import {XHR_CHANNEL} from '../shared/messaging_api';

/**
 * Implementation of compiler/xhr that relays XHR requests to the UI side where they are sent
 * and the result is proxied back to the worker.
 *
 * This is only strictly required for Dart where isolates do not have access to the XHRs.
 */
@Injectable()
export class WebWorkerXHRImpl extends XHR {
  private _messageBroker: ClientMessageBroker;

  constructor(messageBrokerFactory: ClientMessageBrokerFactory) {
    super();
    this._messageBroker = messageBrokerFactory.createMessageBroker(XHR_CHANNEL);
  }

  get(url: string): Promise<string> {
    var fnArgs: FnArg[] = [new FnArg(url, null)];
    var args: UiArguments = new UiArguments("get", fnArgs);
    return this._messageBroker.runOnService(args, String);
  }
}
