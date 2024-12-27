import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
	let service: TranslationService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TranslationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should translate unreadable1 to Bonjour', () => {
		const result = service.translate('unreadable1');
		expect(result).toBe('Bonjour');
	});

	it('should translate unreadable2 to Monde', () => {
		const result = service.translate('unreadable2');
		expect(result).toBe('Monde');
	});

	it('should return "Traduction non trouvée" for unknown text', () => {
		const result = service.translate('unknown');
		expect(result).toBe('Traduction non trouvée');
	});
});
