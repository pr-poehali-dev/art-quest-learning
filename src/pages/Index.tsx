import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PencilBox from "@/components/PencilBox";

const HERO_IMG = "https://cdn.poehali.dev/projects/405427c1-b45a-42bb-b0a4-24919991d6a5/files/6056a985-b5c4-4074-ba21-76a24ac38c36.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "lessons", label: "Уроки", icon: "BookOpen" },
  { id: "gallery", label: "Галерея", icon: "Image" },
  { id: "teacher", label: "Мой Учитель", icon: "Bot" },
  { id: "achievements", label: "Достижения", icon: "Trophy" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "guide", label: "Как работать", icon: "HelpCircle" },
  { id: "admin", label: "Админ", icon: "Settings" },
];

const LESSONS_KIDS = [
  { id: 1, title: "Серия 1: Волшебная кисть", desc: "Буратино учит держать кисть. 3 урока + домашнее задание", episodes: 3, locked: false, emoji: "🧙‍♂️" },
  { id: 2, title: "Серия 2: Тайна цвета", desc: "Котёнок Мур смешивает краски и находит радугу", episodes: 5, locked: false, emoji: "🐱" },
  { id: 3, title: "Серия 3: Мир форм", desc: "Робот Квадрик изучает геометрию в стране фигур", episodes: 4, locked: true, emoji: "🤖" },
  { id: 4, title: "Серия 4: Свет и тень", desc: "Детектив Тень раскрывает загадку светотени", episodes: 6, locked: true, emoji: "🕵️" },
];

const LESSONS_ADULT = [
  { id: 1, title: "Основы композиции", desc: "Правило третей, золотое сечение, динамика кадра", level: "Начальный", done: true },
  { id: 2, title: "Перспектива и пространство", desc: "Линейная и воздушная перспектива, горизонт", level: "Начальный", done: true },
  { id: 3, title: "Работа с цветом", desc: "Цветовые круги, тёплые/холодные тона, гармонии", level: "Средний", done: false },
  { id: 4, title: "Портрет: пропорции лица", desc: "Канонические пропорции, индивидуальные черты", level: "Средний", done: false },
  { id: 5, title: "Живописная техника маслом", desc: "Лессировки, пастозность, фактура холста", level: "Продвинутый", done: false },
];

const GALLERY_ITEMS = [
  { id: 1, author: "Маша, 9 лет", title: "Закат над морем", grade: "5+", comment: "Отличная передача цвета!", color: "from-orange-400 to-pink-500", emoji: "🌅" },
  { id: 2, author: "Петя, 12 лет", title: "Мой кот в сюрреализме", grade: "5", comment: "Смелая композиция!", color: "from-purple-400 to-blue-500", emoji: "🐈" },
  { id: 3, author: "Анна, 16 лет", title: "Натюрморт с тающими часами", grade: "5+", comment: "Виден прогресс в тенях", color: "from-teal-400 to-cyan-500", emoji: "⏰" },
  { id: 4, author: "Виктор, 14 лет", title: "Портрет бабушки", grade: "4+", comment: "Работай над пропорциями", color: "from-amber-400 to-orange-500", emoji: "👵" },
  { id: 5, author: "Соня, 10 лет", title: "Летающий слон", grade: "5", comment: "Фантазия на высоте!", color: "from-pink-400 to-rose-500", emoji: "🐘" },
  { id: 6, author: "Дима, 17 лет", title: "Архитектурный этюд", grade: "4", comment: "Перспектива почти точная", color: "from-indigo-400 to-violet-500", emoji: "🏛️" },
];

const ACHIEVEMENTS = [
  { id: 1, title: "Первый мазок", desc: "Завершил первый урок", icon: "🎨", earned: true, xp: 50 },
  { id: 2, title: "Цветовой маг", desc: "Изучил теорию цвета", icon: "🌈", earned: true, xp: 100 },
  { id: 3, title: "Зоркий глаз", desc: "5 работ получили оценку 5+", icon: "👁️", earned: true, xp: 200 },
  { id: 4, title: "Перспективист", desc: "Завершил модуль перспективы", icon: "🔭", earned: false, xp: 150 },
  { id: 5, title: "Портретист", desc: "Нарисуй 3 портрета", icon: "🖼️", earned: false, xp: 300 },
  { id: 6, title: "Сальвадор", desc: "Создай сюрреалистическую работу", icon: "🕐", earned: false, xp: 500 },
  { id: 7, title: "Мастер кисти", desc: "100 часов практики", icon: "🏆", earned: false, xp: 1000 },
  { id: 8, title: "Наставник", desc: "Оставь 20 комментариев", icon: "⭐", earned: false, xp: 400 },
];

const GUIDE_STEPS = [
  { step: "01", title: "Выбери свой путь", desc: "До 14 лет — мультфильм-квесты. Старше — умные учителя-аватары с AI.", icon: "🗺️" },
  { step: "02", title: "Проходи уроки", desc: "Каждый урок — задание, видео или квест. После урока — домашнее задание.", icon: "📚" },
  { step: "03", title: "Загружай работы", desc: "Сфотографируй рисунок или загрузи цифровую работу. AI её проанализирует.", icon: "📸" },
  { step: "04", title: "Получай обратную связь", desc: "Учитель-аватар сравнит твою работу с эталонами и укажет на ошибки.", icon: "🤖" },
  { step: "05", title: "Зарабатывай достижения", desc: "За каждый урок и хорошую оценку — опыт и значки. Собирай коллекцию!", icon: "🏆" },
  { step: "06", title: "Расти и поступай", desc: "Программа ведёт от уровня ИЗО 3 класса до поступления в художественное училище.", icon: "🎓" },
];

const PENCIL_TO_SECTION: Record<string, string> = {
  home: "home",
  newspaper: "gallery",
  kids: "lessons",
  parents: "guide",
  reference: "achievements",
  workshop: "teacher",
};

export default function Index() {
  const [launched, setLaunched] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [ageGroup, setAgeGroup] = useState<"kids" | "adult">("kids");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "teacher", text: "Привет! Я твой учитель Арт. Загрузи рисунок, и я его разберу, или задай вопрос о технике рисования 🎨" }
  ]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: "teacher",
        text: "Отличный вопрос! В рисунке хорошая энергия, но линия горизонта немного завалена влево. Попробуй использовать линейку как ориентир. Посмотри образец — урок №3 «Перспектива». 🖌️"
      }]);
    }, 600);
  };

  if (!launched) {
    return (
      <PencilBox
        onSelect={(id) => {
          setActiveSection(PENCIL_TO_SECTION[id] || "home");
          setLaunched(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background font-rubik">
      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center text-lg animate-float">
              🎨
            </div>
            <span className="font-caveat text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              АртМастер
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.filter(n => n.id !== "admin").map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:flex gap-1 border-purple-300 text-purple-700">
              ✨ 850 XP
            </Badge>
            <button
              onClick={() => setActiveSection("admin")}
              className={`p-2 rounded-lg transition-all ${activeSection === "admin" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
            >
              <Icon name="Settings" size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
              М
            </div>
          </div>
        </div>

        <div className="lg:hidden flex gap-1 px-4 pb-2 overflow-x-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon name={item.icon} size={12} />
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">

        {/* ─── ГЛАВНАЯ ─── */}
        {activeSection === "home" && (
          <div className="animate-fade-in space-y-12">
            <section className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center">
              <img src={HERO_IMG} alt="АртМастер" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent" />
              <div className="relative z-10 p-8 md:p-14 max-w-xl">
                <Badge className="mb-4 bg-orange-400 text-white border-0 text-sm px-3 py-1">
                  🚀 Школа для будущих художников
                </Badge>
                <h1 className="font-caveat text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                  Рисуй как<br />
                  <span className="text-orange-400">будущий мастер!</span>
                </h1>
                <p className="text-white/80 text-lg mb-6">
                  От уровня ИЗО 3 класса до поступления в художественное училище.
                  Для детей от 8 лет — приключения, для взрослых — AI-учителя.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={() => setActiveSection("lessons")} className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 shadow-lg">
                    Начать учиться
                  </Button>
                  <Button onClick={() => setActiveSection("guide")} variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20">
                    Как это работает
                  </Button>
                </div>
              </div>
              <div className="absolute top-8 right-8 text-5xl animate-float opacity-80">🎭</div>
              <div className="absolute bottom-12 right-24 text-4xl animate-float opacity-70" style={{animationDelay:"1s"}}>⏰</div>
              <div className="absolute top-1/2 right-12 text-3xl animate-float opacity-60" style={{animationDelay:"2s"}}>🦋</div>
            </section>

            <section>
              <h2 className="font-caveat text-4xl font-bold text-center mb-8">Для кого <span className="text-primary">создан АртМастер?</span></h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surreal rounded-3xl p-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white cursor-pointer hover-scale shadow-xl" onClick={() => { setActiveSection("lessons"); setAgeGroup("kids"); }}>
                  <div className="text-6xl mb-4">🧒</div>
                  <h3 className="font-caveat text-3xl font-bold mb-2">Дети 8–14 лет</h3>
                  <p className="text-white/80 mb-4">Обучение через мультфильм-квесты! Каждый урок — это серия приключений с любимыми героями и домашними заданиями.</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-white/20 text-white border-0">🎬 Мультквесты</Badge>
                    <Badge className="bg-white/20 text-white border-0">🏠 Домашние задания</Badge>
                    <Badge className="bg-white/20 text-white border-0">🏆 Значки</Badge>
                  </div>
                </div>
                <div className="card-surreal rounded-3xl p-8 bg-gradient-to-br from-teal-500 to-cyan-600 text-white cursor-pointer hover-scale shadow-xl" onClick={() => { setActiveSection("lessons"); setAgeGroup("adult"); }}>
                  <div className="text-6xl mb-4">🧑‍🎨</div>
                  <h3 className="font-caveat text-3xl font-bold mb-2">Старше 14 лет</h3>
                  <p className="text-white/80 mb-4">Два умных учителя-аватара с AI анализируют твои работы, сравнивают с эталонами и дают точные советы по ошибкам.</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-white/20 text-white border-0">🤖 AI-анализ</Badge>
                    <Badge className="bg-white/20 text-white border-0">📊 Прогресс</Badge>
                    <Badge className="bg-white/20 text-white border-0">🎓 До училища</Badge>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { n: "2 400+", label: "Учеников", emoji: "👨‍🎨" },
                { n: "180", label: "Уроков", emoji: "📚" },
                { n: "98%", label: "Довольных", emoji: "⭐" },
                { n: "12", label: "Мультсерий", emoji: "🎬" },
              ].map(s => (
                <div key={s.n} className="rounded-2xl bg-white border border-border p-5 text-center hover-scale shadow-sm">
                  <div className="text-3xl mb-1">{s.emoji}</div>
                  <div className="font-caveat text-3xl font-bold text-primary">{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* ─── УРОКИ ─── */}
        {activeSection === "lessons" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="font-caveat text-4xl font-bold">Уроки 🎨</h2>
              <Tabs value={ageGroup} onValueChange={v => setAgeGroup(v as "kids" | "adult")}>
                <TabsList className="bg-muted">
                  <TabsTrigger value="kids">🧒 Дети 8–14</TabsTrigger>
                  <TabsTrigger value="adult">🧑‍🎨 Старше 14</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {ageGroup === "kids" && (
              <div className="space-y-4">
                <p className="text-muted-foreground">Уроки через серии мультфильм-квеста. Выбери серию и начни приключение!</p>
                <div className="grid md:grid-cols-2 gap-5">
                  {LESSONS_KIDS.map(lesson => (
                    <div key={lesson.id} className={`rounded-2xl border p-6 transition-all duration-200 ${lesson.locked ? "opacity-60 bg-muted" : "bg-white hover:shadow-lg hover-scale cursor-pointer"}`}>
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-4xl">{lesson.emoji}</span>
                        {lesson.locked
                          ? <Badge variant="outline" className="text-muted-foreground"><Icon name="Lock" size={12} className="mr-1" />Заблокировано</Badge>
                          : <Badge className="bg-green-100 text-green-700 border-green-200">Доступно</Badge>
                        }
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{lesson.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Play" size={12} /> {lesson.episodes} серии
                        </span>
                        {!lesson.locked && <Button size="sm" className="bg-primary text-primary-foreground">Смотреть</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ageGroup === "adult" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-4 flex gap-3">
                  <span className="text-2xl">🤖</span>
                  <p className="text-sm text-teal-800">Программа составлена учителями. AI-аватар анализирует твои работы после каждого урока и сравнивает с эталонами из библиотеки.</p>
                </div>
                <div className="space-y-3">
                  {LESSONS_ADULT.map((lesson, i) => (
                    <div key={lesson.id} className={`rounded-2xl border p-5 flex gap-4 items-center transition-all ${lesson.done ? "bg-green-50 border-green-200" : "bg-white hover:shadow-md cursor-pointer hover-scale"}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${lesson.done ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>
                        {lesson.done ? "✓" : i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <Badge variant="outline" className="text-xs">{lesson.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{lesson.desc}</p>
                      </div>
                      {!lesson.done && <Button size="sm" variant="outline">Начать</Button>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── ГАЛЕРЕЯ ─── */}
        {activeSection === "gallery" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-caveat text-4xl font-bold">Галерея работ 🖼️</h2>
              <Button className="gap-2 bg-primary text-primary-foreground">
                <Icon name="Upload" size={16} />
                Загрузить работу
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GALLERY_ITEMS.map(item => (
                <div key={item.id} className="rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer group">
                  <div className={`h-44 bg-gradient-to-br ${item.color} flex items-center justify-center text-7xl relative`}>
                    <span className="group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs flex-shrink-0 ml-1">{item.grade}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{item.author}</p>
                    <p className="text-xs text-primary italic">"{item.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── МОЙ УЧИТЕЛЬ ─── */}
        {activeSection === "teacher" && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-caveat text-4xl font-bold">Мой Учитель 🤖</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Выбери учителя</h3>
                {[
                  { name: "Арт", spec: "Живопись и цвет", desc: "Специализируется на живописи, акварели и масляных красках. Обожает импрессионистов.", emoji: "👨‍🎨", active: true },
                  { name: "Линея", spec: "Рисунок и графика", desc: "Эксперт по карандашному рисунку, перспективе и архитектурной графике.", emoji: "👩‍🎨", active: false },
                ].map(t => (
                  <div key={t.name} className={`rounded-2xl border p-5 flex gap-4 cursor-pointer transition-all hover-scale ${t.active ? "border-primary bg-primary/5 shadow-md" : "bg-white hover:border-primary/50"}`}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-teal-400 flex items-center justify-center text-3xl flex-shrink-0">
                      {t.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-semibold">{t.name}</h4>
                        <Badge variant="outline" className="text-xs">{t.spec}</Badge>
                        {t.active && <Badge className="bg-green-100 text-green-700 border-0 text-xs">Активен</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl border-2 border-dashed border-primary/40 p-6 text-center bg-primary/5 cursor-pointer hover:border-primary transition-colors">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="font-semibold text-sm mb-1">Загрузи свою работу</p>
                  <p className="text-xs text-muted-foreground">Учитель проанализирует и даст советы</p>
                  <Button size="sm" className="mt-3 bg-primary text-primary-foreground">Выбрать файл</Button>
                </div>
              </div>

              <div className="rounded-2xl border bg-white flex flex-col" style={{height: "500px"}}>
                <div className="p-4 border-b flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-teal-400 flex items-center justify-center text-xl">👨‍🎨</div>
                  <div>
                    <div className="font-semibold text-sm">Арт</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />Онлайн
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t flex gap-2">
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Задай вопрос учителю..."
                    className="flex-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-muted/30"
                  />
                  <Button onClick={sendMessage} size="sm" className="bg-primary text-primary-foreground px-3">
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── ДОСТИЖЕНИЯ ─── */}
        {activeSection === "achievements" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-caveat text-4xl font-bold">Достижения 🏆</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary font-caveat">850 XP</div>
                <div className="text-xs text-muted-foreground">из 2750 XP</div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-orange-400 p-5 text-white">
              <div className="flex justify-between mb-2 text-sm">
                <span>Уровень 3 — Художник-ученик</span>
                <span>850 / 2750 XP</span>
              </div>
              <Progress value={31} className="h-3 bg-white/30" />
              <p className="text-xs mt-2 text-white/70">Следующий уровень: Художник-практик 🎭</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ACHIEVEMENTS.map(a => (
                <div key={a.id} className={`rounded-2xl border p-4 text-center transition-all ${a.earned ? "bg-white shadow-md hover-scale cursor-pointer" : "bg-muted/40 opacity-50"}`}>
                  <div className={`text-4xl mb-2 ${a.earned ? "animate-float" : "grayscale"}`} style={{animationDelay: `${a.id * 0.3}s`}}>{a.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{a.desc}</p>
                  <Badge className={`text-xs ${a.earned ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-muted text-muted-foreground"}`}>
                    {a.xp} XP
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── ПРОФИЛЬ ─── */}
        {activeSection === "profile" && (
          <div className="animate-fade-in space-y-6 max-w-2xl mx-auto">
            <h2 className="font-caveat text-4xl font-bold">Профиль 👤</h2>

            <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-teal-500 p-8 text-white text-center">
              <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center text-5xl mx-auto mb-4 border-4 border-white/50">
                🎨
              </div>
              <h3 className="font-caveat text-3xl font-bold">Маша Иванова</h3>
              <p className="text-white/70 mb-2">Художник-ученик • Уровень 3</p>
              <div className="flex justify-center gap-6 mt-4">
                <div className="text-center"><div className="font-bold text-xl">12</div><div className="text-xs text-white/70">Уроков</div></div>
                <div className="w-px bg-white/30" />
                <div className="text-center"><div className="font-bold text-xl">5</div><div className="text-xs text-white/70">Работ</div></div>
                <div className="w-px bg-white/30" />
                <div className="text-center"><div className="font-bold text-xl">3</div><div className="text-xs text-white/70">Значка</div></div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Имя", value: "Маша Иванова", icon: "User" },
                { label: "Возраст", value: "12 лет", icon: "Calendar" },
                { label: "Группа", value: "Дети (8–14 лет)", icon: "Users" },
                { label: "Учитель", value: "Арт (AI-аватар)", icon: "Bot" },
                { label: "Начал учиться", value: "Январь 2025", icon: "Clock" },
              ].map(field => (
                <div key={field.label} className="flex items-center gap-3 p-4 rounded-xl bg-white border hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Icon name={field.icon} size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">{field.label}</div>
                    <div className="font-medium text-sm">{field.value}</div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/5">
              <Icon name="LogOut" size={16} />
              Выйти из аккаунта
            </Button>
          </div>
        )}

        {/* ─── КАК РАБОТАТЬ ─── */}
        {activeSection === "guide" && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <h2 className="font-caveat text-5xl font-bold mb-2">Как работает <span className="text-primary">АртМастер?</span></h2>
              <p className="text-muted-foreground text-lg">Всего 6 шагов от новичка до художника</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GUIDE_STEPS.map((step, i) => (
                <div key={step.step} className="rounded-2xl bg-white border p-6 hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center text-white font-caveat font-bold text-xl flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <div className="text-2xl mb-1">{step.icon}</div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-teal-500 p-8 text-white text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="font-caveat text-3xl font-bold mb-2">Программа рассчитана на 2 года</h3>
              <p className="text-white/80 mb-6">От первого мазка кисточкой до портфолио для поступления в художественное училище</p>
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  { label: "1–3 мес.", desc: "Основы", emoji: "🌱" },
                  { label: "4–8 мес.", desc: "Техники", emoji: "🌿" },
                  { label: "9–16 мес.", desc: "Мастерство", emoji: "🌳" },
                  { label: "17–24 мес.", desc: "Поступление", emoji: "🎓" },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl mb-1">{s.emoji}</div>
                    <div className="font-bold text-sm">{s.label}</div>
                    <div className="text-xs text-white/60">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button onClick={() => setActiveSection("lessons")} className="bg-primary text-primary-foreground px-8 py-3 text-lg font-semibold">
                🚀 Начать прямо сейчас
              </Button>
            </div>
          </div>
        )}

        {/* ─── АДМИН ─── */}
        {activeSection === "admin" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <Icon name="Settings" size={20} className="text-white" />
              </div>
              <h2 className="font-caveat text-4xl font-bold">Панель администратора</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Учеников", value: "2 418", trend: "+12", icon: "Users", color: "from-blue-500 to-indigo-600" },
                { label: "Уроков загружено", value: "180", trend: "+5", icon: "BookOpen", color: "from-purple-500 to-pink-600" },
                { label: "Работ на проверке", value: "34", trend: "новых", icon: "Image", color: "from-orange-500 to-red-500" },
              ].map(s => (
                <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.color} p-5 text-white`}>
                  <Icon name={s.icon} size={24} className="mb-3 opacity-80" />
                  <div className="font-caveat text-4xl font-bold">{s.value}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/70 text-sm">{s.label}</span>
                    <Badge className="bg-white/20 text-white border-0 text-xs">{s.trend}</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white border p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="BookOpen" size={18} className="text-primary" />Управление уроками
                </h3>
                {[
                  { name: "Загрузить урок", icon: "Upload" },
                  { name: "Загрузить программу", icon: "FileText" },
                  { name: "Загрузить эталонные работы", icon: "Image" },
                  { name: "Настроить мультсерии", icon: "Video" },
                ].map(a => (
                  <button key={a.name} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={a.icon} size={14} className="text-primary" />
                    </div>
                    {a.name}
                    <Icon name="ChevronRight" size={14} className="ml-auto text-muted-foreground" />
                  </button>
                ))}
              </div>

              <div className="rounded-2xl bg-white border p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="Bot" size={18} className="text-accent" />Учителя-аватары
                </h3>
                {[
                  { name: "Настроить AI-учителя Арт", icon: "Settings" },
                  { name: "Настроить AI-учителя Линею", icon: "Settings" },
                  { name: "Просмотреть отчёты AI", icon: "BarChart2" },
                  { name: "Обновить базу эталонов", icon: "RefreshCw" },
                ].map(a => (
                  <button key={a.name} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left text-sm">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon name={a.icon} size={14} className="text-accent" />
                    </div>
                    {a.name}
                    <Icon name="ChevronRight" size={14} className="ml-auto text-muted-foreground" />
                  </button>
                ))}
              </div>

              <div className="rounded-2xl bg-white border p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="Users" size={18} className="text-secondary" />Ученики
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "Маша И.", age: "12 лет", progress: 75, group: "Дети" },
                    { name: "Дима К.", age: "16 лет", progress: 42, group: "Взрослые" },
                    { name: "Соня П.", age: "9 лет", progress: 88, group: "Дети" },
                  ].map(s => (
                    <div key={s.name} className="flex items-center gap-3 p-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-300 to-teal-300 flex items-center justify-center text-white text-xs font-bold">
                        {s.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-0.5">
                          <span className="font-medium">{s.name}</span>
                          <span className="text-xs text-muted-foreground">{s.progress}%</span>
                        </div>
                        <Progress value={s.progress} className="h-1.5" />
                      </div>
                      <Badge variant="outline" className="text-xs">{s.group}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="Shield" size={18} className="text-destructive" />Модерация работ
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "Закат над морем", author: "Маша, 9 лет", time: "2 мин назад" },
                    { name: "Портрет кота", author: "Саша, 11 лет", time: "15 мин назад" },
                    { name: "Натюрморт", author: "Аня, 16 лет", time: "1 час назад" },
                  ].map(w => (
                    <div key={w.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-xl">🖼️</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{w.name}</div>
                        <div className="text-xs text-muted-foreground">{w.author} • {w.time}</div>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                          <Icon name="Check" size={12} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                          <Icon name="X" size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="mt-16 border-t py-8 text-center">
        <div className="font-caveat text-2xl text-primary mb-1">АртМастер 🎨</div>
        <p className="text-sm text-muted-foreground">Школа рисования для детей и взрослых • От 8 лет до мастера</p>
      </footer>
    </div>
  );
}