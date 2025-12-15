/**
 * Aboutページ
 * Manus風のデザインでHelixについて紹介
 */

import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function About() {
  useEffect(() => {
    updateSEO({
      title: "About Us - Helix",
      description: "Helixのミッション、製品、ストーリーについて。医療従事者のためのAIプロンプトライブラリ。",
      path: "/about",
      keywords: "About,Helix,ミッション,医療AI,プロンプト"
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16"
        >
          {/* Title - Centered */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-neutral-900 dark:text-neutral-50 mb-8 md:mb-12 text-center tracking-tight"
            style={{
              fontFamily: '"Crimson Pro", "Lora", serif',
              fontWeight: 600,
            }}
          >
            About Us
          </motion.h1>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[16/8] mb-16 md:mb-20"
          >
            <img
              src="/images/about-hero.png"
              alt="AIと医療従事者の協働を象徴するイメージ"
              className="w-full h-full object-cover"
              onError={(e) => {
                // 画像が読み込めない場合のフォールバック
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.className = parent.className + ' bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center';
                  parent.innerHTML = `
                    <div class="text-center px-8">
                      <p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 italic">
                        AIと医療従事者の協働を象徴するイメージ
                      </p>
                      <p class="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
                        (画像を配置してください: /images/about-hero.png)
                      </p>
                    </div>
                  `;
                }
              }}
            />
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24"
        >
          {/* Our Mission */}
          <motion.section variants={itemVariants} className="mb-12 md:mb-16 lg:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr] gap-4 md:gap-6 lg:gap-8">
              <h2 
                className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif' }}
              >
                Our Mission
              </h2>
              <div 
                className="text-base md:text-lg lg:text-xl text-neutral-900 dark:text-neutral-50 leading-relaxed space-y-3"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif', lineHeight: '1.75' }}
              >
                <p>
                  To empower physicians to reclaim their time and expertise by intelligently handling routine and administrative burdens, allowing them to dedicate more attention to patient dialogue, diagnosis, and treatment.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                  医療従事者が日常業務や管理業務を効率的に処理し、患者との対話、診断、治療により多くの時間を割けるよう支援すること。これが私たちのミッションです。
                </p>
              </div>
            </div>
          </motion.section>

          {/* Our Product */}
          <motion.section variants={itemVariants} className="mb-12 md:mb-16 lg:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr] gap-4 md:gap-6 lg:gap-8">
              <h2 
                className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif' }}
              >
                Our Product
              </h2>
              <div 
                className="text-base md:text-lg lg:text-xl text-neutral-900 dark:text-neutral-50 leading-relaxed space-y-3"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif', lineHeight: '1.75' }}
              >
                <p>
                  We build AI prompt libraries and intelligent workflows as the Action Engine for healthcare professionals.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                  医療従事者のためのAIプロンプトライブラリとインテリジェントなワークフローを構築しています。100以上の実践的なプロンプト、ステップバイステップのガイド、そして医療安全機能を備えたプラットフォームを提供します。
                </p>
              </div>
            </div>
          </motion.section>

          {/* Our Story */}
          <motion.section variants={itemVariants} className="mb-12 md:mb-16 lg:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr] gap-4 md:gap-6 lg:gap-8">
              <h2 
                className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif' }}
              >
                Our Story
              </h2>
              <div 
                className="space-y-4 md:space-y-5 text-base md:text-lg lg:text-xl text-neutral-900 dark:text-neutral-50 leading-relaxed"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif', lineHeight: '1.75' }}
              >
                {/* English paragraphs */}
                <p>
                  In the beginning, there were two strands. Life itself, encoded in the double helix. This fundamental structure has guided every living thing since the dawn of time. It is the blueprint of existence, the code that writes itself into every cell, every organism, every heartbeat.
                </p>
                <p>
                  Medicine began with two hands. The healer and the patient. Human touch, human care. For millennia, this has been the foundation of healing—one person reaching out to another, sharing knowledge, offering comfort, making decisions together. The art of medicine is as ancient as humanity itself, built on trust, empathy, and the irreplaceable bond between caregiver and patient.
                </p>
                <p>
                  Now, we stand at a threshold. Technology has given us tools that previous generations could only imagine. Artificial intelligence can process vast amounts of information, recognize patterns, and assist in ways that augment human capabilities. Yet we face a choice: do we let technology replace the human element, or do we weave it into the fabric of care in a way that amplifies what makes us human?
                </p>
                <p>
                  We choose amplification. We add a third strand to the helix—not to replace the two that came before, but to strengthen them. The helix evolves into something new. Human expertise meets AI intelligence. They weave together, creating a new blueprint for care. The physician's clinical judgment, honed through years of experience and countless patient interactions, combines with AI's ability to process and analyze. The nurse's compassionate touch is supported by intelligent systems that handle routine tasks, freeing time for the moments that matter most.
                </p>
                <p>
                  This is not the end of human medicine. This is its next evolution. Just as the double helix enabled life to adapt and thrive, this new structure enables medicine to reach further, to care deeper, to heal better. We are not replacing the human in healthcare. We are extending human reach, amplifying human care, and preserving what has always been at the heart of medicine: the connection between one human being and another.
                </p>

                {/* Japanese paragraphs */}
                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-700 space-y-4 md:space-y-5">
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    はじめに、二本の鎖がありました。生命そのものが、二重らせんに刻まれていました。この根源的な構造は、時のはじまりから、あらゆる生命を導いてきました。それは存在の設計図であり、すべての細胞に、すべての生命に、すべての鼓動に書き込まれた、永遠のコードです。
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    医学は二つの手から始まりました。治療する者と、治療を受ける者との間で。人間の触れ合いがあり、人間のケアがありました。何千年もの間、これが癒しの礎となってきました。一人の人間がもう一人に手を差し伸べ、知識を分かち合い、慰めを与え、共に決断を下してきました。医学という営みは、人類の歴史と同じだけ古く、信頼と共感、そして治療者と患者の間に築かれる、かけがえのない絆の上に成り立ってきました。
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    そして今、私たちは新たな岐路に立っています。テクノロジーは、かつての世代が夢にも見なかった力を私たちに与えてくれました。人工知能は膨大な情報を瞬時に処理し、複雑なパターンを読み取り、人間の能力を補完します。しかし、私たちには選択が迫られています。テクノロジーに人間の本質を置き換えさせるのか、それとも、人間をより人間らしくするために、テクノロジーをケアという織物に織り込むのか。
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    私たちは拡張を選びます。らせんに第三の鎖を加えます。それは、先にある二本を置き換えるためではなく、それらをより強く、より美しくするためです。らせんは新たな姿へと進化します。人間の専門性とAIの知性が出会い、織り合わされ、ケアのための新しい設計図が生まれます。医師の臨床判断は、長年の経験と数えきれない患者との対話によって磨かれたものです。それが、AIの処理能力と分析力と結びつきます。看護師の温かな触れ合いは、日常的な業務を担うインテリジェントなシステムに支えられ、最も大切な瞬間に集中できる時間を生み出します。
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    これは人間の医学の終わりではありません。これは、その次の進化です。二重らせんが生命に適応と繁栄をもたらしたように、この新しい構造は医学をより遠くへ、より深くへ、より良く癒す方向へと導きます。私たちは医療における人間を置き換えようとしているのではありません。人間の可能性を広げ、人間のケアを拡張し、医学の中心に常にあったもの、すなわち一人の人間ともう一人の人間の間の、かけがえのないつながりを守り続けています。
                  </p>
                </div>
                
                {/* Punchline - Inside Our Story section */}
                <div className="mt-8 md:mt-10 pt-6 md:pt-8">
                  <h3 
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight mb-1"
                    style={{ fontFamily: '"Crimson Pro", "Lora", serif', fontWeight: 600 }}
                  >
                    Helix
                  </h3>
                  <p 
                    className="text-xl md:text-2xl lg:text-3xl font-medium text-neutral-900 dark:text-neutral-50 tracking-tight"
                    style={{ fontFamily: '"Crimson Pro", "Lora", serif' }}
                  >
                    Augmenting Medicine.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>

      </div>
    </Layout>
  );
}
