/**
 * Created by Administrator on 2017/6/8 0008.
 */
/**
 * 批处理构造函数
 * @constructor
 */
function Batcher() {
    this.reset();
}

/**
 * 批处理重置
 */
Batcher.prototype.reset = function () {
    this.has = {};
    this.queue = [];
    this.waiting = false;
};

/**
 * 将事件添加到队列中
 * @param job {Watcher} watcher事件
 */
Batcher.prototype.push = function (job) {
    if (!this.has[job.id]) {
        this.queue.push(job);
        this.has[job.id] = job;
        if (!this.waiting) {
            this.waiting = true;
            setTimeout(() => {
                this.flush();
            });
        }
    }
};

/**
 * 执行并清空事件队列
 */
Batcher.prototype.flush = function () {
    this.queue.forEach((job) => {
        job.cb.call(job.ctx);
    });
    this.reset();
};

export default Batcher;