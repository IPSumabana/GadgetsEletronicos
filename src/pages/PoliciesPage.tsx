import React, { useState } from 'react';
import { ShieldCheck, RotateCcw, Truck, Lock, FileText } from 'lucide-react';
import { STORE_EMAIL, WHATSAPP_DISPLAY } from '../utils/formatters';

export const PoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'garantia' | 'devolucoes' | 'envios' | 'privacidade' | 'termos'>('garantia');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Transparência & Legislação Moçambicana
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Políticas & Termos Legais
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Consulte as nossas normas de garantia, devoluções, privacidade e envios de mercadorias em Moçambique.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'garantia', label: 'Garantia Oficial 12M', icon: ShieldCheck },
          { id: 'devolucoes', label: 'Devoluções & Trocas', icon: RotateCcw },
          { id: 'envios', label: 'Entregas Maputo & Matola', icon: Truck },
          { id: 'privacidade', label: 'Privacidade & Dados', icon: Lock },
          { id: 'termos', label: 'Termos de Utilização', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-10 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        {activeTab === 'garantia' && (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Política de Garantia de 12 a 24 Meses
            </h2>
            <p>
              Todos os produtos tecnológicos comercializados pela GADGETSZONE são 100% originais, novos e embalados de fábrica. Fornecemos uma garantia padrão de <strong className="text-slate-900">12 meses</strong> para dispositivos eletrónicos (smartphones, consolas, auscultadores, óculos inteligentes) e de até <strong className="text-slate-900">24 meses</strong> para computadores de secretária montados e componentes selecionados (Motherboards, Processadores, Fontes de Alimentação).
            </p>
            <h3 className="font-bold text-slate-900 pt-2">Condições da Garantia:</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Apresentação da factura pró-forma ou recibo original emitido pela GADGETSZONE LDA.</li>
              <li>Preservação do número de série (SKU/Serial Number) intacto no equipamento.</li>
              <li>A garantia cobre falhas de fabrico, problemas em placas-mãe, sensores, módulos Wi-Fi/Bluetooth e displays sem sinais de quebra mecânica.</li>
              <li>Excluem-se da garantia danos acidentais por queda, imersão em líquidos não autorizados ou oscilações graves da rede eléctrica sem proteção prévia.</li>
            </ul>
          </div>
        )}

        {activeTab === 'devolucoes' && (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Política de Devoluções e Reembolsos
            </h2>
            <p>
              O cliente tem o direito de solicitar a troca ou devolução do artigo no prazo de <strong className="text-slate-900">7 dias de calendário</strong> após o recebimento da encomenda, desde que o produto esteja rigorosamente selado, com todos os manuais, cabos e embalagem sem marcas de uso.
            </p>
            <h3 className="font-bold text-slate-900 pt-2">Como solicitar a devolução:</h3>
            <p>
              Basta entrar em contacto com a nossa equipa de apoio ao cliente via WhatsApp (<strong className="text-slate-900">{WHATSAPP_DISPLAY}</strong>) ou pelo e-mail <strong className="text-slate-900">{STORE_EMAIL}</strong> indicando o número da encomenda (#GZ-XXXX). Após verificação física do produto no nosso centro técnico em Maputo, o reembolso será processado no prazo de até 48 horas úteis através da mesma via de pagamento (M-Pesa, e-Mola ou Transferência Bancária).
            </p>
          </div>
        )}

        {activeTab === 'envios' && (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Prazos e Entregas em Maputo e Matola
            </h2>
            <p>
              Operamos com estafetas próprios dedicados para garantir entregas rápidas, seguras e com acompanhamento directo em Maputo e Matola:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong className="text-slate-900">Maputo Cidade (Polana, Central, Sommerschield, Alto Maé, Costa do Sol, Zimpeto):</strong> Entregas rápidas no próprio dia (para pedidos confirmados até às 13h00) ou em até 24 horas úteis.</li>
              <li><strong className="text-slate-900">Matola (Matola Rio, Machava, Liberdade, Tsalala, Fomento, Matola Gare):</strong> Entregas seguras em 24 a 48 horas úteis com contacto prévio do estafeta.</li>
              <li><strong className="text-slate-900">Levantamento na Loja (Polana Cimento):</strong> Gratuito e disponível em cerca de 2 horas após confirmação na Av. 24 de Julho nº 1420.</li>
              <li><strong className="text-slate-900">Portes Grátis:</strong> Oferta de entrega gratuita em Maputo e Matola para encomendas iguais ou superiores a 50.000 MT.</li>
            </ul>
          </div>
        )}

        {activeTab === 'privacidade' && (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Protecção de Dados & Privacidade
            </h2>
            <p>
              A GADGETSZONE compromete-se a proteger a privacidade dos seus utilizadores em estrita conformidade com a legislação da República de Moçambique sobre Transacções Electrónicas e Protecção de Dados Pessoais.
            </p>
            <p>
              As informações recolhidas durante o checkout (nome, telemóvel, morada e endereço de e-mail) são utilizadas exclusivamente para o processamento, emissão de factura e envio da sua encomenda. Não vendemos nem compartilhamos dados com terceiros para fins de marketing sem o seu expresso consentimento.
            </p>
          </div>
        )}

        {activeTab === 'termos' && (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Termos e Condições de Utilização
            </h2>
            <p>
              Ao utilizar este website e efectuar encomendas na GADGETSZONE LDA (NUIT: 401928310, com sede na Av. 24 de Julho nº 1420, Maputo, Moçambique), o utilizador aceita integralmente as condições aqui estipuladas.
            </p>
            <p>
              Todos os preços indicados no website estão fixados em Meticais (MZN) e incluem o IVA aplicável à taxa em vigor. As imagens dos produtos são meramente ilustrativas da versão oficial do fabricante.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
