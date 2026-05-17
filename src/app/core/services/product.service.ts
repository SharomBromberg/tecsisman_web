import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Product, ProductComment } from '../domain/catalog/product.model';
import { Category } from '../domain/catalog/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // --- MOCKS: CATEGORÍAS ---
  private readonly categoriesMock: Category[] = [
    { id: 'c1', name: 'Cloud Computing' },
    { id: 'c2', name: 'Seguridad Informática' },
    { id: 'c3', name: 'Redes y Telecomunicaciones' },
    { id: 'c4', name: 'Hardware y Equipos' }
  ];

  // --- MOCKS: 20 PRODUCTOS (5 POR CATEGORÍA) ---
  private readonly productsMock: Product[] = [
    // Cloud Computing
    { id: 'p1', name: 'Servidor VPS Linux Pro', description: 'Instancia virtual de alto rendimiento.', technicalDescription: '4 vCPU, 8GB RAM, 100GB NVMe.', price: 29.99, stock: 99, categoryId: 'c1', images: ['https://picsum.photos/seed/tecsisman1/500/500'], rating: 4.8, comments: [], featured: true, tags: ['vps', 'linux', 'cloud'] },
    { id: 'p2', name: 'Hosting Web Empresarial', description: 'Alojamiento para webs de alto tráfico.', technicalDescription: 'Ancho de banda ilimitado, cPanel.', price: 15.00, stock: 500, categoryId: 'c1', images: ['https://picsum.photos/seed/tecsisman2/500/500'], rating: 4.5, comments: [] },
    { id: 'p3', name: 'Almacenamiento Cloud S3 1TB', description: 'Almacenamiento seguro y redundante.', technicalDescription: 'Encriptación AES-256 en reposo.', price: 8.50, stock: 200, categoryId: 'c1', images: ['https://picsum.photos/seed/tecsisman3/500/500'], rating: 4.9, comments: [] },
    { id: 'p4', name: 'Base de Datos MySQL Gestionada', description: 'Cluster de DB con backups diarios.', technicalDescription: 'MySQL 8, 50GB storage, 2 vCPU.', price: 45.00, stock: 50, categoryId: 'c1', images: ['https://picsum.photos/seed/tecsisman4/500/500'], rating: 4.7, comments: [] },
    { id: 'p5', name: 'Dominio .COM.MX', description: 'Registro de dominio anual.', technicalDescription: 'Gestión DNS incluida.', price: 12.00, stock: 999, categoryId: 'c1', images: ['https://picsum.photos/seed/tecsisman5/500/500'], rating: 4.2, comments: [] },
    
    // Seguridad
    { id: 'p6', name: 'Firewall Perimetral Fortinet', description: 'Protección avanzada contra amenazas.', technicalDescription: 'Throughput 5 Gbps, Filtrado Web.', price: 850.00, stock: 15, categoryId: 'c2', images: ['https://picsum.photos/seed/tecsisman6/500/500'], rating: 5.0, comments: [], featured: true, tags: ['seguridad', 'firewall', 'fortinet'] },
    { id: 'p7', name: 'Antivirus Corporativo (50 Licencias)', description: 'Seguridad endpoint gestionada.', technicalDescription: 'Motor heurístico AI, anti-ransomware.', price: 299.00, stock: 100, categoryId: 'c2', images: ['https://picsum.photos/seed/tecsisman7/500/500'], rating: 4.6, comments: [] },
    { id: 'p8', name: 'Cámara IP Domo 4K', description: 'Vigilancia de ultra alta definición.', technicalDescription: 'Lente varifocal, visión nocturna 30m.', price: 120.00, stock: 45, categoryId: 'c2', images: ['https://picsum.photos/seed/tecsisman8/500/500'], rating: 4.4, comments: [] },
    { id: 'p9', name: 'Control de Acceso Biométrico', description: 'Lector de huella y tarjeta RFID.', technicalDescription: 'Conexión TCP/IP, hasta 3000 usuarios.', price: 340.00, stock: 10, categoryId: 'c2', images: ['https://picsum.photos/seed/tecsisman9/500/500'], rating: 4.8, comments: [] },
    { id: 'p10', name: 'Auditoría de Seguridad (Pentest)', description: 'Servicio de hacking ético.', technicalDescription: 'Análisis de caja negra y caja blanca.', price: 1500.00, stock: 5, categoryId: 'c2', images: ['https://picsum.photos/seed/tecsisman10/500/500'], rating: 5.0, comments: [] },

    // Redes
    { id: 'p11', name: 'Switch Gestionable 24 Puertos', description: 'Switch capa 2/3 para rack.', technicalDescription: '24 x 10/100/1000 Mbps, 4 SFP.', price: 320.00, stock: 25, categoryId: 'c3', images: ['https://picsum.photos/seed/tecsisman11/500/500'], rating: 4.7, comments: [], featured: true, tags: ['switch', 'redes', 'cisco'] },
    { id: 'p12', name: 'Router WiFi 6 Enterprise', description: 'Router de alto rendimiento AX3000.', technicalDescription: 'MU-MIMO, OFDMA, WPA3.', price: 150.00, stock: 60, categoryId: 'c3', images: ['https://picsum.photos/seed/tecsisman12/500/500'], rating: 4.5, comments: [] },
    { id: 'p13', name: 'Bobina de Cable UTP Cat 6 (305m)', description: 'Cableado estructurado de cobre puro.', technicalDescription: '100% Cobre, chaqueta LSZH.', price: 115.00, stock: 120, categoryId: 'c3', images: ['https://picsum.photos/seed/tecsisman13/500/500'], rating: 4.9, comments: [] },
    { id: 'p14', name: 'Access Point Exterior Largo Alcance', description: 'Cobertura WiFi para espacios abiertos.', technicalDescription: 'IP67, PoE, Antenas Direccionales.', price: 210.00, stock: 18, categoryId: 'c3', images: ['https://picsum.photos/seed/tecsisman14/500/500'], rating: 4.6, comments: [] },
    { id: 'p15', name: 'Gabinete Rack de Piso 42U', description: 'Gabinete cerrado para servidores.', technicalDescription: 'Acero SPCC, Puerta perforada.', price: 650.00, stock: 4, categoryId: 'c3', images: ['https://picsum.photos/seed/tecsisman15/500/500'], rating: 4.8, comments: [] },

    // Hardware
    { id: 'p16', name: 'Servidor Torre Dell PowerEdge', description: 'Servidor para PyMES.', technicalDescription: 'Intel Xeon E-2224, 16GB RAM, 1TB HDD.', price: 1200.00, stock: 8, categoryId: 'c4', images: ['https://picsum.photos/seed/tecsisman16/500/500'], rating: 4.8, comments: [], featured: true, tags: ['servidor', 'dell', 'hardware'] },
    { id: 'p17', name: 'Laptop Ejecutiva ThinkPad', description: 'Equipo portátil de alta durabilidad.', technicalDescription: 'Core i7 12va Gen, 16GB, 512GB SSD.', price: 1350.00, stock: 35, categoryId: 'c4', images: ['https://picsum.photos/seed/tecsisman17/500/500'], rating: 4.9, comments: [] },
    { id: 'p18', name: 'Monitor UltraWide 34"', description: 'Monitor curvo para productividad.', technicalDescription: 'Panel IPS, WQHD, sRGB 99%.', price: 420.00, stock: 20, categoryId: 'c4', images: ['https://picsum.photos/seed/tecsisman18/500/500'], rating: 4.7, comments: [] },
    { id: 'p19', name: 'Estación de Trabajo HP Z2', description: 'Workstation para diseño/render.', technicalDescription: 'NVIDIA RTX A2000, 32GB RAM.', price: 2100.00, stock: 5, categoryId: 'c4', images: ['https://picsum.photos/seed/tecsisman19/500/500'], rating: 5.0, comments: [] },
    { id: 'p20', name: 'NAS de 4 Bahías Synology', description: 'Almacenamiento en red local.', technicalDescription: 'Soporte RAID 0/1/5/10, Dual LAN.', price: 580.00, stock: 12, categoryId: 'c4', images: ['https://picsum.photos/seed/tecsisman20/500/500'], rating: 4.6, comments: [] }
  ];

  // Estado Reactivo Pura Vida (Patrón Observable Data Service)
  private readonly categoriesSubject = new BehaviorSubject<Category[]>(this.categoriesMock);
  private readonly productsSubject = new BehaviorSubject<Product[]>(this.productsMock);

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    if (!categoryId || categoryId === 'todos') return this.getProducts();
    return this.productsSubject.pipe(
      map(products => products.filter(p => p.categoryId === categoryId))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.productsSubject.pipe(
      map(products => products.filter(p => p.featured))
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return this.productsSubject.pipe(
      map(products => products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        (!!p.tags && p.tags.some(t => t.toLowerCase().includes(lowerQuery)))
      ))
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.productsSubject.pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  addCategory(name: string): Observable<void> {
    const newCategory: Category = {
      id: `c${new Date().getTime()}`,
      name
    };
    this.categoriesSubject.next([...this.categoriesSubject.value, newCategory]);
    return of(undefined);
  }

  deleteCategory(id: string): Observable<void> {
    const filtered = this.categoriesSubject.value.filter(c => c.id !== id);
    this.categoriesSubject.next(filtered);
    return of(undefined);
  }

  addProduct(product: Partial<Product>): Observable<void> {
    const newProduct: Product = {
      id: `p${new Date().getTime()}`,
      name: product.name || '',
      description: product.description || '',
      technicalDescription: product.technicalDescription || '',
      price: product.price || 0,
      stock: product.stock || 0,
      categoryId: product.categoryId || '',
      images: product.images || [],
      rating: product.rating || 0,
      comments: [],
      featured: product.featured || false,
      tags: product.tags || []
    };
    this.productsSubject.next([...this.productsSubject.value, newProduct]);
    return of(undefined);
  }

  deleteProduct(id: string): Observable<void> {
    const filtered = this.productsSubject.value.filter(p => p.id !== id);
    this.productsSubject.next(filtered);
    return of(undefined);
  }

  addComment(productId: string, comment: any): Observable<void> {
    const updated = this.productsSubject.value.map(p => {
      if (p.id === productId) {
        const newComment: ProductComment = {
          author: comment.author,
          text: comment.message || comment.text, // Adaptado para retrocompatibilidad
          message: comment.message || comment.text,
          rating: comment.rating,
          createdAt: new Date().toISOString()
        };
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });
    this.productsSubject.next(updated);
    return of(undefined);
  }
}