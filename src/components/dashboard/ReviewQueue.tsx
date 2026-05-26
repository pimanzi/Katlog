import { Image as ImageIcon, Clock, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const reviewItems = [
  { file: 'product-hero.jpg',  product: 'Nike Air Max',  waiting: '2h', urgent: true  },
  { file: 'variant-blue.png',  product: 'Adidas Samba',  waiting: '4h', urgent: false },
  { file: 'lookbook-2024.pdf', product: 'Summer Coll.',  waiting: '6h', urgent: false },
]

export default function ReviewQueue() {
  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-semibold text-text">Review queue</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-warning-light text-warning-text text-[10px] font-semibold">
              7 pending
            </span>
          </div>
          <button className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary-dark transition-colors">
            View all <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {reviewItems.map(item => (
            <div key={item.file} className="flex flex-col gap-3 p-3 rounded-xl border border-border bg-bg">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-light shrink-0">
                    <ImageIcon size={14} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-text truncate">{item.file}</p>
                    <p className="text-[10px] text-text-muted truncate">{item.product}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                  item.urgent ? 'bg-error-light text-error-text' : 'bg-draft-light text-draft'
                }`}>
                  {item.urgent ? 'Urgent' : 'Normal'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-text-muted">
                <Clock size={10} className="shrink-0" />
                <span>Waiting {item.waiting}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-7 text-[11px] gap-1 border-success text-success-text hover:bg-success-light hover:text-success-text">
                  <CheckCircle2 size={12} /> Approve
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-7 text-[11px] gap-1 border-error text-error-text hover:bg-error-light hover:text-error-text">
                  <XCircle size={12} /> Reject
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Button className="bg-primary hover:bg-primary-dark text-white text-[12px] h-9 px-6 gap-1.5">
            Go to full review queue <ArrowRight size={13} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
