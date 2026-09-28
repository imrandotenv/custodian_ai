export type UserRole = 'tourist' | 'custodian' | 'admin';

export type CraftCategory = 
  | 'Hand-Painted Home Decor'
  | 'Sohrai Murals'
  | 'Khovar Bridal Art'
  | 'Paitkar Scroll Art'
  | 'Jadopatia Folklore'
  | 'Dokra Bell Metal';

export type SoilPigment = 
  | 'Dudhimati (White Kaolin Clay)'
  | 'Charak Mati (Cream Alkaline Clay)'
  | 'Lal Geru (Red Hematite Ochre)'
  | 'Kala Mati / Manganese (Black Forest Clay)'
  | 'Pila Mati (Yellow Ochre)'
  | 'Dokra Bell Metal Brass (Lost Wax)';

export type AiConsentPolicy = 
  | 'CC-TRIBAL-1.0-STRICT (Zero AI Training / Absolute Protection)'
  | 'CC-TRIBAL-1.0-RESEARCH (Ethical Non-Profit Research Only with Santhali Attribution)'
  | 'CC-TRIBAL-1.0-ROYALTY (Commercial Training Allowed with 25% Community Heritage Royalty)';

export interface Artisan {
  id: string;
  name: string;
  nativeNameOlChiki?: string; // Santhali Ol Chiki or Devanagari
  village: string;
  district: string;
  state: string;
  craftSpecialty: string;
  avatar: string;
  bio: string;
  experienceYears: number;
  giTagCertified: boolean;
  giCertNumber: string;
  upiId: string;
  totalCreations: number;
  totalEarnings: number;
  oralLoreExcerpt: string;
  audioDuration: string;
}

export interface Product {
  id: string;
  title: string;
  hindiTitle?: string;
  category: CraftCategory;
  price: number;
  artisanPayout: number; // 90% direct payout
  atelierLogistics: number; // 10% packaging & GI dispatch
  artisanId: string;
  artisanName: string;
  artisanVillage: string;
  artisanAvatar: string;
  dimensions: string;
  weight: string;
  pigmentsUsed: SoilPigment[];
  giTagNumber: string;
  provenanceHash: string; // Cryptographic SHA-256 hash
  aiConsentPolicy: AiConsentPolicy;
  description: string;
  culturalLore: string;
  loreAudioUrl?: string;
  image: string;
  secondaryImages?: string[];
  stock: number;
  isReserved?: boolean;
  featured?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LivingAtelier {
  id: string;
  name: string;
  hamlet: string;
  district: string;
  craftType: string;
  curator: string;
  description: string;
  coordinates: { lat: number; lng: number };
  workshopHighlights: string[];
  duration: string;
  pricePerParticipant: number;
  nextBatch: string;
  image: string;
}

export interface VerificationRecord {
  giTag: string;
  provenanceHash: string;
  artisanName: string;
  artisanVillage: string;
  artworkTitle: string;
  dateCertified: string;
  naturalMediums: string[];
  aiConsentStatus: string;
  blockchainBlock?: number;
  status: 'AUTHENTIC_GI_VERIFIED' | 'REVOKED' | 'PENDING_AUDIT';
}
