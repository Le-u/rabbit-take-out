import Axios from 'axios';
// 配置 请求次数
import axiosRetry from 'axios-retry';
const CancelToken = Axios.CancelToken;
// const token = localStorage.getItem('token');
const client = Axios.create({
	timeout: 20000,
	// headers:
});

axiosRetry(client, {
	// 传入axios实例
	retries: 3, // 设置自动发送请求次数
	retryDelay: retryCount => {
		return retryCount * 1500; // 重复请求延迟（毫秒）
	},
	shouldResetTimeout: true, //  重置超时时间
	retryCondition: error => {
		// true为打开自动发送请求，false为关闭自动发送请求
		if (error.message.includes('timeout') || error.message.includes('status code')) {
			return true;
		} else {
			return false;
		}
	},
});

// 重复发送请求取消上次未完成的请求
export function withCancelToken(fetcher) {
	let abort;
	function send(data, config) {
		cancel();

		const cancelToken = new CancelToken(cancel => (abort = cancel));
		return fetcher(data, { ...config, cancelToken });
	}

	function cancel(message = abort) {
		if (abort) {
			abort(message);
			abort = null;
		}
	}

	return [send, cancel];
}

export async function request(url, config) {
	const response = await client.request({ url, ...config });
	return response;
}

export default client;
