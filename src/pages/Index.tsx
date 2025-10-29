import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
  category: string;
  preview: string[];
  description: string;
}

interface CartItem extends Book {
  quantity: number;
}

const books: Book[] = [
  {
    id: 1,
    title: "Искусство программирования",
    author: "Дональд Кнут",
    price: 1299,
    cover: "https://cdn.poehali.dev/projects/4895bc05-30f9-4582-8568-77e9b5a7f24d/files/17d9fbbb-d4bf-4479-a84b-f3bfabdfdafb.jpg",
    category: "Техническая литература",
    description: "Фундаментальный труд по программированию и алгоритмам.",
    preview: [
      "Введение в алгоритмы",
      "Глава 1. Основные понятия",
      "В этой книге мы рассмотрим основные принципы программирования...",
      "1.1 Что такое алгоритм?",
      "Алгоритм — это последовательность шагов для решения задачи."
    ]
  },
  {
    id: 2,
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    price: 599,
    cover: "https://cdn.poehali.dev/projects/4895bc05-30f9-4582-8568-77e9b5a7f24d/files/8f9c3e80-56ca-4a28-843b-b831a68b6906.jpg",
    category: "Классическая литература",
    description: "Культовый роман о любви, добре и зле.",
    preview: [
      "Часть первая",
      "Глава 1. Никогда не разговаривайте с неизвестными",
      "Однажды весною, в час небывало жаркого заката, в Москве...",
      "На Патриарших прудах появились два гражданина.",
      "Первый из них, одетый в летнюю серенькую пару..."
    ]
  },
  {
    id: 3,
    title: "Думай медленно... Решай быстро",
    author: "Даниэль Канеман",
    price: 899,
    cover: "https://cdn.poehali.dev/projects/4895bc05-30f9-4582-8568-77e9b5a7f24d/files/5b7ac232-e54d-4547-b453-ef5b10c92293.jpg",
    category: "Психология",
    description: "Книга о том, как мы принимаем решения.",
    preview: [
      "Введение",
      "Две системы мышления",
      "Наш разум использует две системы для принятия решений...",
      "Система 1 — быстрая, интуитивная и эмоциональная.",
      "Система 2 — медленная, обдуманная и логическая."
    ]
  },
  {
    id: 4,
    title: "1984",
    author: "Джордж Оруэлл",
    price: 699,
    cover: "https://cdn.poehali.dev/projects/4895bc05-30f9-4582-8568-77e9b5a7f24d/files/17d9fbbb-d4bf-4479-a84b-f3bfabdfdafb.jpg",
    category: "Антиутопия",
    description: "Роман о тоталитарном обществе будущего.",
    preview: [
      "Часть первая",
      "Глава 1",
      "Был холодный ясный апрельский день, и часы пробили тринадцать.",
      "Уинстон Смит, прижав подбородок к груди...",
      "Скользнул в стеклянные двери Победного Дома."
    ]
  },
  {
    id: 5,
    title: "Sapiens. Краткая история человечества",
    author: "Юваль Ной Харари",
    price: 999,
    cover: "https://cdn.poehali.dev/projects/4895bc05-30f9-4582-8568-77e9b5a7f24d/files/8f9c3e80-56ca-4a28-843b-b831a68b6906.jpg",
    category: "История",
    description: "Увлекательный рассказ о развитии человечества.",
    preview: [
      "Введение",
      "Животное, которого не было",
      "Около 13,5 миллиарда лет назад материя, энергия...",
      "Время и пространство возникли в результате Большого взрыва.",
      "История Вселенной — это история усложнения."
    ]
  },
  {
    id: 6,
    title: "Атлант расправил плечи",
    author: "Айн Рэнд",
    price: 1499,
    cover: "https://cdn.poehali.dev/projects/4895bc05-30f9-4582-8568-77e9b5a7f24d/files/5b7ac232-e54d-4547-b453-ef5b10c92293.jpg",
    category: "Философия",
    description: "Философский роман о свободе и капитализме.",
    preview: [
      "Часть первая: Непротиворечивость",
      "Глава 1. Тема",
      "— Кто такой Джон Голт?",
      "Вопрос прозвучал не как вопрос, а как возглас отчаяния...",
      "Эдди Уиллерс шёл по улице в сумерках весеннего вечера."
    ]
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'cart' | 'contacts'>('home');

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === bookId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openPreview = (book: Book) => {
    setSelectedBook(book);
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="BookOpen" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">Книжная лавка</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('cart')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'cart' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'товар' : 'товара'}` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Icon name="BookOpen" size={48} className="text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Добавьте книги в корзину</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.cover}
                                alt={item.title}
                                className="w-16 h-24 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.title}</h4>
                                <p className="text-xs text-muted-foreground">{item.author}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={12} />
                                  </Button>
                                  <span className="text-sm w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={12} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 ml-auto"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={12} />
                                  </Button>
                                </div>
                                <p className="text-sm font-semibold mt-2">{item.price * item.quantity} ₽</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <>
            <section className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Электронные книги для души</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Погрузитесь в мир знаний и литературы. Тысячи книг в цифровом формате с возможностью предпросмотра.
              </p>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Популярные книги</h3>
                <Button variant="outline">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                  <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-64 object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-2">
                        {book.category}
                      </Badge>
                      <CardTitle className="text-xl mb-2">{book.title}</CardTitle>
                      <CardDescription className="mb-4">{book.author}</CardDescription>
                      <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{book.price} ₽</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => openPreview(book)}
                      >
                        <Icon name="Eye" size={16} className="mr-2" />
                        Предпросмотр
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => addToCart(book)}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === 'contacts' && (
          <section className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Контакты</h2>
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">info@bookshop.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Часы работы</h4>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Книжная, д. 1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBook?.title}</DialogTitle>
            <DialogDescription>{selectedBook?.author}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <img
              src={selectedBook?.cover}
              alt={selectedBook?.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="bg-muted/50 p-6 rounded-lg space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="BookOpen" size={20} className="text-primary" />
                <h4 className="font-semibold">Предпросмотр первых страниц</h4>
              </div>
              {selectedBook?.preview.map((line, index) => (
                <p
                  key={index}
                  className={`${
                    index === 0 || line.startsWith('Глава')
                      ? 'font-bold text-lg mt-4'
                      : 'text-muted-foreground'
                  }`}
                >
                  {line}
                </p>
              ))}
              <div className="text-center pt-4 border-t mt-4">
                <p className="text-sm text-muted-foreground italic">
                  Купите книгу, чтобы прочитать полностью
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-3xl font-bold text-primary">{selectedBook?.price} ₽</span>
              <Button
                size="lg"
                onClick={() => {
                  if (selectedBook) addToCart(selectedBook);
                  setPreviewOpen(false);
                }}
              >
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Купить книгу
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-16 py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Книжная лавка. Электронные книги для души.</p>
        </div>
      </footer>
    </div>
  );
}