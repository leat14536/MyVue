/**
 * Created by Administrator on 2017/6/4 0004.
 */
/**
 * 格式转换(有待扩充)
 * @param s {string} 例如: user.name
 * @returns {Array} [{expression: "user.name"}]
 */
exports.parse = function (s) {
    let dirs = [];
    dirs.push({
        expression: s
    });
    return dirs;
};