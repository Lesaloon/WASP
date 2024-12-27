// TODO: you need to install a karma server to test this service and only use chrome browser to test it  because this doesnt work on firefox

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class TranslationService {
	constructor() {}

	translate(unreadableText: string): string {
		const translationMap: { [key: string]: string } = {
			unreadable1: 'Bonjour',
			unreadable2: 'Monde',
			hello: 'Bonjour',
			world: 'Monde',
		};

		return translationMap[unreadableText] || 'Traduction non trouvée';
	}
}
