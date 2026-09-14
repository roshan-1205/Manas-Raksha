import { MessageSquare, Phone, Mic, Info } from "lucide-react";

const channels = [
  {
    name: "Bhashini",
    description: "Multilingual speech-to-text for regional language support",
    Icon: Mic,
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-100",
  },
  {
    name: "MSG91",
    description: "SMS alerts and communication for follow-up notifications",
    Icon: MessageSquare,
    color: "text-green-600",
    bg: "bg-green-50 border-green-100",
  },
  {
    name: "Twilio Voice / PSTN IVR",
    description: "Voice calls and DTMF interaction for telephone-based check-ins",
    Icon: Phone,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    name: "Meta WhatsApp Cloud API",
    description: "Chat, notifications, and voice-note collection via WhatsApp",
    Icon: MessageSquare,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-100",
  },
];

export default function CommunicationChannels() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-heading font-semibold text-gray-800">Planned Communication Channels</h3>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap shrink-0">
          <Info size={12} />
          Planned — not connected
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {channels.map(({ name, description, Icon, color, bg }) => (
          <div key={name} className={`rounded-lg border p-3 ${bg}`}>
            <div className="flex items-center gap-2 mb-1">
              <Icon size={15} className={color} />
              <span className={`text-sm font-semibold ${color}`}>{name}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-400 border-t border-gray-100 pt-3">
        Planned integration — these channels are not connected in this prototype. Integration will require appropriate approvals and API credentials.
      </p>
    </div>
  );
}
