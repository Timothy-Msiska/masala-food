'use client'

import { FormEvent, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check, ChevronDown, FileText, Megaphone, Truck, Wheat } from 'lucide-react'
import Image from 'next/image'
import { PageShell } from '@/components/page-shell'

type Pathway = 'Supplier' | 'Buyer' | 'Marketing' | 'Logistics'

const pathways = {
  Supplier: { icon: Wheat, title: 'Suppliers and producers', intro: 'List verified products, manage stock and respond to buyer enquiries.', fields: ['Business or farm name', 'Primary commodity', 'Available volume per month', 'Operating country'] },
  Buyer: { icon: BriefcaseBusiness, title: 'Commercial buyers', intro: 'Discover supply, request quotations and coordinate delivery.', fields: ['Company or organisation', 'Products you source', 'Estimated monthly requirement', 'Delivery destination'] },
  Marketing: { icon: Megaphone, title: 'Marketing partners', intro: 'Refer members, support trade introductions and track eligible commissions.', fields: ['Full name', 'Organisation or network', 'Markets you cover', 'Preferred contact channel'] },
  Logistics: { icon: Truck, title: 'Logistics providers', intro: 'Receive assigned deliveries, manage shipments and upload records.', fields: ['Company name', 'Service type', 'Routes or countries covered', 'Fleet or capacity'] },
}

export default function MemberPage() {
  const [pathway, setPathway] = useState<Pathway | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const active = pathway ? pathways[pathway] : null
  const Icon = active?.icon
  const formTitle = useMemo(() => pathway ? `Register as a ${pathway.toLowerCase()} partner` : '', [pathway])
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }

  return <PageShell eyebrow="Join MASALA FOOD" title={<>Build trade that <em>moves.</em></>} intro="Choose the pathway that matches your role. We collect only the information needed to verify your organisation and activate the right workspace permissions.">
    <section className="registration-wrap mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="registration-brand"><span className="registration-brand-mark" aria-hidden="true"><Image src="/masala-logo.png" alt="" width={68} height={68} /></span><div><span className="eyebrow">Trusted agricultural trade</span><p>One network. Four practical ways to participate.</p></div></div>
      {!pathway && <div className="registration-grid">{(Object.entries(pathways) as [Pathway, typeof pathways[Pathway]][]).map(([key, item]) => { const CardIcon = item.icon; return <button className="pathway-card" key={key} onClick={() => setPathway(key)}><span className="pathway-icon"><CardIcon size={20}/></span><span className="pathway-copy"><strong>{item.title}</strong><small>{item.intro}</small><i>Registration includes verification and workspace access</i></span><ArrowRight size={17}/></button> })}</div>}
      {pathway && active && Icon && <div className="registration-form-card"><button className="back-link" onClick={() => { setPathway(null); setSubmitted(false) }}><ArrowLeft size={15}/> Choose another pathway</button>{submitted ? <div className="registration-success"><span className="success-icon"><Check size={24}/></span><p className="eyebrow">Application received</p><h2>Your {pathway.toLowerCase()} pathway is in review.</h2><p>We will check your details and send a confirmation with the next verification steps. Your workspace will be activated after approval.</p><a href="/" className="button button-dark">Return home <ArrowRight size={15}/></a></div> : <><div className="form-heading"><span className="pathway-icon"><Icon size={20}/></span><div><p className="eyebrow">{pathway} pathway</p><h2>{formTitle}</h2><p>{active.intro}</p></div></div><form onSubmit={submit} className="registration-form"><div className="form-fields">{active.fields.map((field, index) => <label key={field}>{field}<input required placeholder={index === 0 ? 'Enter details' : 'Select or enter details'} /></label>)}<label>Work email address<input type="email" required placeholder="name@organisation.com" /></label><label>Phone number<input required placeholder="Country code and number" /></label></div><div className="verification-note"><FileText size={17}/><span><strong>Verification note</strong><small>After submitting, we may request registration documents, proof of address and a responsible contact person.</small></span></div><label className="consent-line"><input type="checkbox" required /> I agree to the MASALA FOOD terms and verification process.</label><button className="button button-dark" type="submit">Submit registration <ArrowRight size={15}/></button></form></>}</div>}
    </section>
  </PageShell>
}
