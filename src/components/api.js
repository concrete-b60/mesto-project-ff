import { Promise } from 'core-js';

const config = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
	headers: {
		authorization: '41ce45f1-7a48-4239-b660-9aaf9f20da84',
		'Content-Type': 'application/json',
	},
};

function getUserProfile() {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}

			return Promise.reject(`Ошибка: ${res.status}`);
		})

		.then(data => {
			return data;
		})

		.catch(err => {
			console.log(err);
		});
}

function getInitialCards() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})

		.then(data => {
			return data;
		})

		.catch(err => {
			console.log(err);
		});
}

export function loadInitialData() {
	return Promise.all([getUserProfile(), getInitialCards()]);
}

export function patchUserProfile(name, about) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})

		.catch(err => {
			console.log(err);
		});
}

export function postNewCard(name, link) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})

		.catch(err => {
			console.log(err);
		});
}

export function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.catch(err => {
			console.log(err);
		});
}

export function putLikeCard(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.catch(err => {
			console.log(err);
		});
}

export function deleteLikeCard(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.catch(err => {
			console.log(err);
		});
}

export function patchProfileAvatar(avatar) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatar,
		}),
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.catch(err => {
			console.log(err);
		});
}
