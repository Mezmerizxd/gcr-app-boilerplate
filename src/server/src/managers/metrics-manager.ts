import { logger } from '../helpers/logger';
import * as os from 'os-utils';

class MetricsManager {
  protected static instance: MetricsManager;

  static getInstance(): MetricsManager {
    if (!MetricsManager.instance) {
      MetricsManager.instance = new MetricsManager();
    }
    return MetricsManager.instance;
  }

  _interval: NodeJS.Timeout | null = null;
  _intervalTime: number = 1000 * 60 * 60 * 1; // 1 hours

  platform: string = 'none';
  process_uptime: number = 0;
  uptime: number = 0;
  cpu_usage: number = 0;
  cpu_count: number = 0;
  cpu_free: number = 0;
  mem_usage: number = 0;
  mem_total: number = 0;
  mem_free: number = 0;

  constructor() {}

  start() {
    logger.debug('[MetricsManager] started');

    this.interval();

    if (this._interval) {
      clearInterval(this._interval);
    }
    this._interval = setInterval(() => this.interval(), this._intervalTime);
  }

  stop() {
    logger.debug('[MetricsManager] stopped');

    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  restart() {
    logger.debug('[MetricsManager] restarted');

    this.stop();
    this.start();
  }

  async interval() {
    logger.debug('[MetricsManager] interval started');

    this.getMetrics();

    logger.debug('[MetricsManager] interval finished');
  }

  getMetrics(): Server.MetricsData {
    os.cpuUsage((usage: number) => {
      this.cpu_usage = Math.round(usage * 100);
    });
    this.cpu_count = os.cpuCount();
    os.cpuFree((free: number) => {
      this.cpu_free = Math.round(free * 100);
    });

    this.mem_total = Math.round(os.totalmem());
    this.mem_free = Math.round(os.freemem());
    this.mem_usage = Math.round(os.totalmem() - os.freemem());
    this.platform = os.platform();
    this.process_uptime = Math.round(os.processUptime());
    this.uptime = Math.round(os.sysUptime());

    return {
      platform: this.platform,
      process_uptime: this.process_uptime,
      uptime: this.uptime,
      cpu_usage: this.cpu_usage,
      cpu_count: this.cpu_count,
      cpu_free: this.cpu_free,
      mem_usage: this.mem_usage,
      mem_total: this.mem_total,
      mem_free: this.mem_free,
    };
  }
}

export const metricsManager = MetricsManager.getInstance();
