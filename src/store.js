const PFX = 'csvacademy::';
export const store = {
  get(k) { try { const v=localStorage.getItem(PFX+k); return v?JSON.parse(v):null; } catch(e){ return null; } },
  set(k,v) { try { localStorage.setItem(PFX+k, JSON.stringify(v)); } catch(e){} },
  del(k) { try { localStorage.removeItem(PFX+k); } catch(e){} },
};
