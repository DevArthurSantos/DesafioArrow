import { Injectable } from '@nestjs/common';

import * as cluster from 'cluster';
import * as os from 'os';

@Injectable()
export class AppClusterService {
  static clusterize(callback: Function): void {
    const numCPUs = os.cpus().length;
    const targetCPUs = Math.floor(numCPUs * 0.25);

    if (cluster.isMaster) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < targetCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
