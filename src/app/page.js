import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white relative z-0">
      <div className="pt-[2.75rem] w-full min-h-[calc(100vh-2.75rem)]">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-bg.svg')] opacity-5 dark:opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center z-0">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 relative inline-block">
              Trancy Reader
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              重新定义英文阅读体验，用科技提升你的语言能力
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reading" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5">
                开始使用
              </Link>
              <a href="#features" className="px-8 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-transparent dark:border dark:border-white/30 dark:hover:border-white/50 text-gray-800 dark:text-white font-medium rounded-lg transition-all">
                了解更多 ↓
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 w-full flex justify-center animate-bounce">
            <a href="#features" className="text-gray-400 dark:text-white/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white">智能阅读，超越界限</h2>
            
            {/* 保持现有功能卡片结构 - 移除课程相关卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon="📚" 
                title="精品英文阅读" 
                description="严选高质量英文文章，帮助你提升阅读理解能力" 
              />
              <FeatureCard 
                icon="📝" 
                title="智能单词记录" 
                description="阅读过程中随手记录生词，自动构建个人词汇库，高效提升词汇量" 
              />
              <FeatureCard 
                icon="🔍" 
                title="AI 翻译与解析" 
                description="集成强大的 LLM 翻译功能，提供准确翻译与深入语言解析" 
              />
              <FeatureCard 
                icon="🧠" 
                title="Anki 导出功能" 
                description="一键将生词导出至 Anki，打造个性化记忆库，实现高效记忆" 
              />
              <FeatureCard 
                icon="🔑" 
                title="自定义 LLM Token" 
                description="支持使用个人 API 密钥，提供更个性化的翻译和解析体验" 
              />
              {/* 移除了考纲相关性分析卡片 */}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white">如何使用</h2>
            
            {/* 修改步骤内容，移除考纲相关描述 */}
            <div className="space-y-16">
              <Step 
                number="01" 
                title="选择感兴趣的文章" 
                description="从我们精选的英文文章中，选择符合你兴趣的阅读材料。" 
              />
              <Step 
                number="02" 
                title="智能阅读与单词收集" 
                description="阅读过程中遇到生词？只需点击即可记录，并获得 AI 驱动的翻译与解析。" 
              />
              <Step 
                number="03" 
                title="导出学习并巩固记忆" 
                description="将收集的单词一键导出至 Anki，通过科学的间隔重复方法加深记忆。" 
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto text-center border dark:border-blue-800/30 p-8 rounded-2xl bg-white/80 backdrop-blur-sm dark:bg-blue-950/20 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">准备好提升你的英语能力了吗？</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              加入 Trancy Reader，开启智能英语阅读之旅。
            </p>
            <Link href="/reading" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 font-medium rounded-lg transition-all inline-block shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/20 transform hover:-translate-y-0.5">
              立即开始
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

// 功能卡片组件 - 支持亮暗主题
function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white dark:bg-white/5 shadow-md dark:backdrop-blur-sm border border-gray-100 dark:border-white/10 rounded-lg hover:shadow-lg dark:hover:border-white/20 transition-all dark:hover:shadow-blue-500/10">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

// 步骤组件 - 支持亮暗主题
function Step({ number, title, description }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="text-4xl font-bold text-blue-500 opacity-75">{number}</div>
      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
