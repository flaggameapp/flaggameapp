# Auditoria pos-implementacao - Desafio Mundial e Google Play Games

Data da auditoria: 2026-07-19.

Escopo obedecido: nenhum codigo foi corrigido, nenhum build foi gerado, nenhuma dependencia foi instalada e nenhuma formatacao automatica foi executada. O unico arquivo criado/alterado por esta tarefa e este relatorio.

## Sumario executivo

- O Desafio Mundial existe como implementacao JavaScript real: motor, UI, persistencia local, carteira, recompensas, continuacao, fila de repeticao e testes unitarios/integrais JS.
- A integracao Google Play Games esta dividida: existe plugin Capacitor nativo local em `plugins/capacitor-play-games`, mas este checkout nao contem projeto Android de aplicativo (`android/`, `capacitor.config.*`, `package.json`, Gradle wrapper, `MainActivity`, `applicationId`). Portanto nao ha prova local de app Android sincronizado/instalavel.
- Saved Games, placares e conquistas oficiais possuem codigo nativo no plugin e adaptadores JS, porem dependem do app Android real, recursos XML preenchidos pela Play Console, sincronizacao Capacitor e teste em dispositivo.
- `dist/` e ZIPs nao estao rastreados por Git, mas aparecem como arquivos novos untracked. Eles nao entram em `git diff --stat`, o que esconde grande parte do volume atual.
- Ha 20 arquivos de idioma em `locales/`. As chaves novas existem, mas varias linguas ainda usam textos em ingles para Play Games/cloud/continuacao, entao nao ha traducao completa em todos os idiomas.

## Comandos Git obrigatorios

### `git status --short`

~~~text
 M css/style.css
 M index.html
 M js/app.js
 M js/background.js
 M js/i18n.js
 M locales/ar.json
 M locales/bn.json
 M locales/de.json
 M locales/en.json
 M locales/es.json
 M locales/fr.json
 M locales/hi.json
 M locales/id.json
 M locales/it.json
 M locales/ja.json
 M locales/ko.json
 M locales/nl.json
 M locales/pl.json
 M locales/pt-BR.json
 M locales/ru.json
 M locales/th.json
 M locales/tr.json
 M locales/uk.json
 M locales/vi.json
 M locales/zh-CN.json
 M manifest.json
?? Flaggame.zip
?? assets/images/
?? assets/pix-qrcode.png
?? dist/
?? "divulga\303\247\303\243o/"
?? docs/
?? game/
?? homepage/
?? js/challenges.js
?? js/cloud-save.js
?? js/firebase-auth.js
?? js/locales-data.js
?? js/platform-capabilities.js
?? js/play-games-adapter.js
?? js/play-games-competitive.js
?? js/profile.js
?? js/ranking.js
?? js/storage.js
?? js/sync.js
?? js/world-challenge-storage.js
?? js/world-challenge-wallet.js
?? js/world-challenge.js
?? manifests/
?? plugins/
?? robots.txt
?? scripts/
?? tests/
~~~

### `git diff --name-status`

~~~text
M	css/style.css
M	index.html
M	js/app.js
M	js/background.js
M	js/i18n.js
M	locales/ar.json
M	locales/bn.json
M	locales/de.json
M	locales/en.json
M	locales/es.json
M	locales/fr.json
M	locales/hi.json
M	locales/id.json
M	locales/it.json
M	locales/ja.json
M	locales/ko.json
M	locales/nl.json
M	locales/pl.json
M	locales/pt-BR.json
M	locales/ru.json
M	locales/th.json
M	locales/tr.json
M	locales/uk.json
M	locales/vi.json
M	locales/zh-CN.json
M	manifest.json
~~~

### `git diff --stat`

~~~text
 css/style.css      | 2735 +++++++++++++++++++++++++++++++++++++++++++++++-----
 index.html         | 1020 ++++++++++----------
 js/app.js          | 2377 ++++++++++++++++++++++++++++++++++++++++-----
 js/background.js   |   16 +-
 js/i18n.js         |  501 +++++++++-
 locales/ar.json    |  181 +++-
 locales/bn.json    |  181 +++-
 locales/de.json    |  181 +++-
 locales/en.json    |  181 +++-
 locales/es.json    |  181 +++-
 locales/fr.json    |  181 +++-
 locales/hi.json    |  181 +++-
 locales/id.json    |  181 +++-
 locales/it.json    |  181 +++-
 locales/ja.json    |  181 +++-
 locales/ko.json    |  181 +++-
 locales/nl.json    |  181 +++-
 locales/pl.json    |  181 +++-
 locales/pt-BR.json |  181 +++-
 locales/ru.json    |  181 +++-
 locales/th.json    |  181 +++-
 locales/tr.json    |  181 +++-
 locales/uk.json    |  181 +++-
 locales/vi.json    |  181 +++-
 locales/zh-CN.json |  181 +++-
 manifest.json      |   28 +-
 26 files changed, 9230 insertions(+), 1067 deletions(-)
~~~

### `git ls-files --others --exclude-standard`

~~~text
Flaggame.zip
assets/images/2400-1.png
assets/images/2400-2.png
assets/images/2400-3.png
assets/images/chrome.png
assets/images/edge.png
assets/images/firefox.png
assets/images/globo.png
assets/images/logo.png
assets/images/logo128.png
assets/images/logo16.png
assets/images/logo32.png
assets/images/logo48.png
assets/images/pix-qrcode.png
assets/pix-qrcode.png
dist/chrome/assets/flags/ad.svg
dist/chrome/assets/flags/ae.svg
dist/chrome/assets/flags/af.svg
dist/chrome/assets/flags/ag.svg
dist/chrome/assets/flags/ai.svg
dist/chrome/assets/flags/al.svg
dist/chrome/assets/flags/am.svg
dist/chrome/assets/flags/ao.svg
dist/chrome/assets/flags/aq.svg
dist/chrome/assets/flags/ar.svg
dist/chrome/assets/flags/as.svg
dist/chrome/assets/flags/at.svg
dist/chrome/assets/flags/au.svg
dist/chrome/assets/flags/aw.svg
dist/chrome/assets/flags/ax.svg
dist/chrome/assets/flags/az.svg
dist/chrome/assets/flags/ba.svg
dist/chrome/assets/flags/bb.svg
dist/chrome/assets/flags/bd.svg
dist/chrome/assets/flags/be.svg
dist/chrome/assets/flags/bf.svg
dist/chrome/assets/flags/bg.svg
dist/chrome/assets/flags/bh.svg
dist/chrome/assets/flags/bi.svg
dist/chrome/assets/flags/bj.svg
dist/chrome/assets/flags/bl.svg
dist/chrome/assets/flags/bm.svg
dist/chrome/assets/flags/bn.svg
dist/chrome/assets/flags/bo.svg
dist/chrome/assets/flags/bq.svg
dist/chrome/assets/flags/br.svg
dist/chrome/assets/flags/bs.svg
dist/chrome/assets/flags/bt.svg
dist/chrome/assets/flags/bv.svg
dist/chrome/assets/flags/bw.svg
dist/chrome/assets/flags/by.svg
dist/chrome/assets/flags/bz.svg
dist/chrome/assets/flags/ca.svg
dist/chrome/assets/flags/cc.svg
dist/chrome/assets/flags/cd.svg
dist/chrome/assets/flags/cf.svg
dist/chrome/assets/flags/cg.svg
dist/chrome/assets/flags/ch.svg
dist/chrome/assets/flags/ci.svg
dist/chrome/assets/flags/ck.svg
dist/chrome/assets/flags/cl.svg
dist/chrome/assets/flags/cm.svg
dist/chrome/assets/flags/cn.svg
dist/chrome/assets/flags/co.svg
dist/chrome/assets/flags/cr.svg
dist/chrome/assets/flags/cu.svg
dist/chrome/assets/flags/cv.svg
dist/chrome/assets/flags/cw.svg
dist/chrome/assets/flags/cx.svg
dist/chrome/assets/flags/cy.svg
dist/chrome/assets/flags/cz.svg
dist/chrome/assets/flags/de.svg
dist/chrome/assets/flags/dj.svg
dist/chrome/assets/flags/dk.svg
dist/chrome/assets/flags/dm.svg
dist/chrome/assets/flags/do.svg
dist/chrome/assets/flags/dz.svg
dist/chrome/assets/flags/ec.svg
dist/chrome/assets/flags/ee.svg
dist/chrome/assets/flags/eg.svg
dist/chrome/assets/flags/eh.svg
dist/chrome/assets/flags/er.svg
dist/chrome/assets/flags/es.svg
dist/chrome/assets/flags/et.svg
dist/chrome/assets/flags/eu.svg
dist/chrome/assets/flags/fi.svg
dist/chrome/assets/flags/fj.svg
dist/chrome/assets/flags/fk.svg
dist/chrome/assets/flags/fm.svg
dist/chrome/assets/flags/fo.svg
dist/chrome/assets/flags/fr.svg
dist/chrome/assets/flags/ga.svg
dist/chrome/assets/flags/gb-eng.svg
dist/chrome/assets/flags/gb-nir.svg
dist/chrome/assets/flags/gb-sct.svg
dist/chrome/assets/flags/gb-wls.svg
dist/chrome/assets/flags/gb.svg
dist/chrome/assets/flags/gd.svg
dist/chrome/assets/flags/ge.svg
dist/chrome/assets/flags/gf.svg
dist/chrome/assets/flags/gg.svg
dist/chrome/assets/flags/gh.svg
dist/chrome/assets/flags/gi.svg
dist/chrome/assets/flags/gl.svg
dist/chrome/assets/flags/gm.svg
dist/chrome/assets/flags/gn.svg
dist/chrome/assets/flags/gp.svg
dist/chrome/assets/flags/gq.svg
dist/chrome/assets/flags/gr.svg
dist/chrome/assets/flags/gs.svg
dist/chrome/assets/flags/gt.svg
dist/chrome/assets/flags/gu.svg
dist/chrome/assets/flags/gw.svg
dist/chrome/assets/flags/gy.svg
dist/chrome/assets/flags/hk.svg
dist/chrome/assets/flags/hm.svg
dist/chrome/assets/flags/hn.svg
dist/chrome/assets/flags/hr.svg
dist/chrome/assets/flags/ht.svg
dist/chrome/assets/flags/hu.svg
dist/chrome/assets/flags/id.svg
dist/chrome/assets/flags/ie.svg
dist/chrome/assets/flags/il.svg
dist/chrome/assets/flags/im.svg
dist/chrome/assets/flags/in.svg
dist/chrome/assets/flags/io.svg
dist/chrome/assets/flags/iq.svg
dist/chrome/assets/flags/ir.svg
dist/chrome/assets/flags/is.svg
dist/chrome/assets/flags/it.svg
dist/chrome/assets/flags/je.svg
dist/chrome/assets/flags/jm.svg
dist/chrome/assets/flags/jo.svg
dist/chrome/assets/flags/jp.svg
dist/chrome/assets/flags/ke.svg
dist/chrome/assets/flags/kg.svg
dist/chrome/assets/flags/kh.svg
dist/chrome/assets/flags/ki.svg
dist/chrome/assets/flags/km.svg
dist/chrome/assets/flags/kn.svg
dist/chrome/assets/flags/kp.svg
dist/chrome/assets/flags/kr.svg
dist/chrome/assets/flags/kw.svg
dist/chrome/assets/flags/ky.svg
dist/chrome/assets/flags/kz.svg
dist/chrome/assets/flags/la.svg
dist/chrome/assets/flags/lb.svg
dist/chrome/assets/flags/lc.svg
dist/chrome/assets/flags/li.svg
dist/chrome/assets/flags/lk.svg
dist/chrome/assets/flags/lr.svg
dist/chrome/assets/flags/ls.svg
dist/chrome/assets/flags/lt.svg
dist/chrome/assets/flags/lu.svg
dist/chrome/assets/flags/lv.svg
dist/chrome/assets/flags/ly.svg
dist/chrome/assets/flags/ma.svg
dist/chrome/assets/flags/mc.svg
dist/chrome/assets/flags/md.svg
dist/chrome/assets/flags/me.svg
dist/chrome/assets/flags/mf.svg
dist/chrome/assets/flags/mg.svg
dist/chrome/assets/flags/mh.svg
dist/chrome/assets/flags/mk.svg
dist/chrome/assets/flags/ml.svg
dist/chrome/assets/flags/mm.svg
dist/chrome/assets/flags/mn.svg
dist/chrome/assets/flags/mo.svg
dist/chrome/assets/flags/mp.svg
dist/chrome/assets/flags/mq.svg
dist/chrome/assets/flags/mr.svg
dist/chrome/assets/flags/ms.svg
dist/chrome/assets/flags/mt.svg
dist/chrome/assets/flags/mu.svg
dist/chrome/assets/flags/mv.svg
dist/chrome/assets/flags/mw.svg
dist/chrome/assets/flags/mx.svg
dist/chrome/assets/flags/my.svg
dist/chrome/assets/flags/mz.svg
dist/chrome/assets/flags/na.svg
dist/chrome/assets/flags/nc.svg
dist/chrome/assets/flags/ne.svg
dist/chrome/assets/flags/nf.svg
dist/chrome/assets/flags/ng.svg
dist/chrome/assets/flags/ni.svg
dist/chrome/assets/flags/nl.svg
dist/chrome/assets/flags/no.svg
dist/chrome/assets/flags/np.svg
dist/chrome/assets/flags/nr.svg
dist/chrome/assets/flags/nu.svg
dist/chrome/assets/flags/nz.svg
dist/chrome/assets/flags/om.svg
dist/chrome/assets/flags/pa.svg
dist/chrome/assets/flags/pe.svg
dist/chrome/assets/flags/pf.svg
dist/chrome/assets/flags/pg.svg
dist/chrome/assets/flags/ph.svg
dist/chrome/assets/flags/pk.svg
dist/chrome/assets/flags/pl.svg
dist/chrome/assets/flags/pm.svg
dist/chrome/assets/flags/pn.svg
dist/chrome/assets/flags/pr.svg
dist/chrome/assets/flags/ps.svg
dist/chrome/assets/flags/pt.svg
dist/chrome/assets/flags/pw.svg
dist/chrome/assets/flags/py.svg
dist/chrome/assets/flags/qa.svg
dist/chrome/assets/flags/re.svg
dist/chrome/assets/flags/ro.svg
dist/chrome/assets/flags/rs.svg
dist/chrome/assets/flags/ru.svg
dist/chrome/assets/flags/rw.svg
dist/chrome/assets/flags/sa.svg
dist/chrome/assets/flags/sb.svg
dist/chrome/assets/flags/sc.svg
dist/chrome/assets/flags/sd.svg
dist/chrome/assets/flags/se.svg
dist/chrome/assets/flags/sg.svg
dist/chrome/assets/flags/sh.svg
dist/chrome/assets/flags/si.svg
dist/chrome/assets/flags/sj.svg
dist/chrome/assets/flags/sk.svg
dist/chrome/assets/flags/sl.svg
dist/chrome/assets/flags/sm.svg
dist/chrome/assets/flags/sn.svg
dist/chrome/assets/flags/so.svg
dist/chrome/assets/flags/sr.svg
dist/chrome/assets/flags/ss.svg
dist/chrome/assets/flags/st.svg
dist/chrome/assets/flags/sv.svg
dist/chrome/assets/flags/sx.svg
dist/chrome/assets/flags/sy.svg
dist/chrome/assets/flags/sz.svg
dist/chrome/assets/flags/tc.svg
dist/chrome/assets/flags/td.svg
dist/chrome/assets/flags/tf.svg
dist/chrome/assets/flags/tg.svg
dist/chrome/assets/flags/th.svg
dist/chrome/assets/flags/tj.svg
dist/chrome/assets/flags/tk.svg
dist/chrome/assets/flags/tl.svg
dist/chrome/assets/flags/tm.svg
dist/chrome/assets/flags/tn.svg
dist/chrome/assets/flags/to.svg
dist/chrome/assets/flags/tr.svg
dist/chrome/assets/flags/tt.svg
dist/chrome/assets/flags/tv.svg
dist/chrome/assets/flags/tw.svg
dist/chrome/assets/flags/tz.svg
dist/chrome/assets/flags/ua.svg
dist/chrome/assets/flags/ug.svg
dist/chrome/assets/flags/um.svg
dist/chrome/assets/flags/us.svg
dist/chrome/assets/flags/uy.svg
dist/chrome/assets/flags/uz.svg
dist/chrome/assets/flags/va.svg
dist/chrome/assets/flags/vc.svg
dist/chrome/assets/flags/ve.svg
dist/chrome/assets/flags/vg.svg
dist/chrome/assets/flags/vi.svg
dist/chrome/assets/flags/vn.svg
dist/chrome/assets/flags/vu.svg
dist/chrome/assets/flags/wf.svg
dist/chrome/assets/flags/ws.svg
dist/chrome/assets/flags/xk.svg
dist/chrome/assets/flags/ye.svg
dist/chrome/assets/flags/yt.svg
dist/chrome/assets/flags/za.svg
dist/chrome/assets/flags/zm.svg
dist/chrome/assets/flags/zw.svg
dist/chrome/assets/images/2400-1.png
dist/chrome/assets/images/2400-2.png
dist/chrome/assets/images/2400-3.png
dist/chrome/assets/images/chrome.png
dist/chrome/assets/images/edge.png
dist/chrome/assets/images/firefox.png
dist/chrome/assets/images/globo.png
dist/chrome/assets/images/logo.png
dist/chrome/assets/images/logo128.png
dist/chrome/assets/images/logo16.png
dist/chrome/assets/images/logo32.png
dist/chrome/assets/images/logo48.png
dist/chrome/assets/images/pix-qrcode.png
dist/chrome/assets/pix-qrcode.png
dist/chrome/css/style.css
dist/chrome/game/index.html
dist/chrome/js/app.js
dist/chrome/js/background.js
dist/chrome/js/challenges.js
dist/chrome/js/cloud-save.js
dist/chrome/js/countries.js
dist/chrome/js/firebase-auth.js
dist/chrome/js/i18n.js
dist/chrome/js/locales-data.js
dist/chrome/js/platform-capabilities.js
dist/chrome/js/play-games-adapter.js
dist/chrome/js/play-games-competitive.js
dist/chrome/js/profile.js
dist/chrome/js/ranking.js
dist/chrome/js/storage.js
dist/chrome/js/sync.js
dist/chrome/js/world-challenge-storage.js
dist/chrome/js/world-challenge-wallet.js
dist/chrome/js/world-challenge.js
dist/chrome/locales/ar.json
dist/chrome/locales/bn.json
dist/chrome/locales/de.json
dist/chrome/locales/en.json
dist/chrome/locales/es.json
dist/chrome/locales/fr.json
dist/chrome/locales/hi.json
dist/chrome/locales/id.json
dist/chrome/locales/it.json
dist/chrome/locales/ja.json
dist/chrome/locales/ko.json
dist/chrome/locales/nl.json
dist/chrome/locales/pl.json
dist/chrome/locales/pt-BR.json
dist/chrome/locales/ru.json
dist/chrome/locales/th.json
dist/chrome/locales/tr.json
dist/chrome/locales/uk.json
dist/chrome/locales/vi.json
dist/chrome/locales/zh-CN.json
dist/chrome/manifest.json
dist/edge/assets/flags/ad.svg
dist/edge/assets/flags/ae.svg
dist/edge/assets/flags/af.svg
dist/edge/assets/flags/ag.svg
dist/edge/assets/flags/ai.svg
dist/edge/assets/flags/al.svg
dist/edge/assets/flags/am.svg
dist/edge/assets/flags/ao.svg
dist/edge/assets/flags/aq.svg
dist/edge/assets/flags/ar.svg
dist/edge/assets/flags/as.svg
dist/edge/assets/flags/at.svg
dist/edge/assets/flags/au.svg
dist/edge/assets/flags/aw.svg
dist/edge/assets/flags/ax.svg
dist/edge/assets/flags/az.svg
dist/edge/assets/flags/ba.svg
dist/edge/assets/flags/bb.svg
dist/edge/assets/flags/bd.svg
dist/edge/assets/flags/be.svg
dist/edge/assets/flags/bf.svg
dist/edge/assets/flags/bg.svg
dist/edge/assets/flags/bh.svg
dist/edge/assets/flags/bi.svg
dist/edge/assets/flags/bj.svg
dist/edge/assets/flags/bl.svg
dist/edge/assets/flags/bm.svg
dist/edge/assets/flags/bn.svg
dist/edge/assets/flags/bo.svg
dist/edge/assets/flags/bq.svg
dist/edge/assets/flags/br.svg
dist/edge/assets/flags/bs.svg
dist/edge/assets/flags/bt.svg
dist/edge/assets/flags/bv.svg
dist/edge/assets/flags/bw.svg
dist/edge/assets/flags/by.svg
dist/edge/assets/flags/bz.svg
dist/edge/assets/flags/ca.svg
dist/edge/assets/flags/cc.svg
dist/edge/assets/flags/cd.svg
dist/edge/assets/flags/cf.svg
dist/edge/assets/flags/cg.svg
dist/edge/assets/flags/ch.svg
dist/edge/assets/flags/ci.svg
dist/edge/assets/flags/ck.svg
dist/edge/assets/flags/cl.svg
dist/edge/assets/flags/cm.svg
dist/edge/assets/flags/cn.svg
dist/edge/assets/flags/co.svg
dist/edge/assets/flags/cr.svg
dist/edge/assets/flags/cu.svg
dist/edge/assets/flags/cv.svg
dist/edge/assets/flags/cw.svg
dist/edge/assets/flags/cx.svg
dist/edge/assets/flags/cy.svg
dist/edge/assets/flags/cz.svg
dist/edge/assets/flags/de.svg
dist/edge/assets/flags/dj.svg
dist/edge/assets/flags/dk.svg
dist/edge/assets/flags/dm.svg
dist/edge/assets/flags/do.svg
dist/edge/assets/flags/dz.svg
dist/edge/assets/flags/ec.svg
dist/edge/assets/flags/ee.svg
dist/edge/assets/flags/eg.svg
dist/edge/assets/flags/eh.svg
dist/edge/assets/flags/er.svg
dist/edge/assets/flags/es.svg
dist/edge/assets/flags/et.svg
dist/edge/assets/flags/eu.svg
dist/edge/assets/flags/fi.svg
dist/edge/assets/flags/fj.svg
dist/edge/assets/flags/fk.svg
dist/edge/assets/flags/fm.svg
dist/edge/assets/flags/fo.svg
dist/edge/assets/flags/fr.svg
dist/edge/assets/flags/ga.svg
dist/edge/assets/flags/gb-eng.svg
dist/edge/assets/flags/gb-nir.svg
dist/edge/assets/flags/gb-sct.svg
dist/edge/assets/flags/gb-wls.svg
dist/edge/assets/flags/gb.svg
dist/edge/assets/flags/gd.svg
dist/edge/assets/flags/ge.svg
dist/edge/assets/flags/gf.svg
dist/edge/assets/flags/gg.svg
dist/edge/assets/flags/gh.svg
dist/edge/assets/flags/gi.svg
dist/edge/assets/flags/gl.svg
dist/edge/assets/flags/gm.svg
dist/edge/assets/flags/gn.svg
dist/edge/assets/flags/gp.svg
dist/edge/assets/flags/gq.svg
dist/edge/assets/flags/gr.svg
dist/edge/assets/flags/gs.svg
dist/edge/assets/flags/gt.svg
dist/edge/assets/flags/gu.svg
dist/edge/assets/flags/gw.svg
dist/edge/assets/flags/gy.svg
dist/edge/assets/flags/hk.svg
dist/edge/assets/flags/hm.svg
dist/edge/assets/flags/hn.svg
dist/edge/assets/flags/hr.svg
dist/edge/assets/flags/ht.svg
dist/edge/assets/flags/hu.svg
dist/edge/assets/flags/id.svg
dist/edge/assets/flags/ie.svg
dist/edge/assets/flags/il.svg
dist/edge/assets/flags/im.svg
dist/edge/assets/flags/in.svg
dist/edge/assets/flags/io.svg
dist/edge/assets/flags/iq.svg
dist/edge/assets/flags/ir.svg
dist/edge/assets/flags/is.svg
dist/edge/assets/flags/it.svg
dist/edge/assets/flags/je.svg
dist/edge/assets/flags/jm.svg
dist/edge/assets/flags/jo.svg
dist/edge/assets/flags/jp.svg
dist/edge/assets/flags/ke.svg
dist/edge/assets/flags/kg.svg
dist/edge/assets/flags/kh.svg
dist/edge/assets/flags/ki.svg
dist/edge/assets/flags/km.svg
dist/edge/assets/flags/kn.svg
dist/edge/assets/flags/kp.svg
dist/edge/assets/flags/kr.svg
dist/edge/assets/flags/kw.svg
dist/edge/assets/flags/ky.svg
dist/edge/assets/flags/kz.svg
dist/edge/assets/flags/la.svg
dist/edge/assets/flags/lb.svg
dist/edge/assets/flags/lc.svg
dist/edge/assets/flags/li.svg
dist/edge/assets/flags/lk.svg
dist/edge/assets/flags/lr.svg
dist/edge/assets/flags/ls.svg
dist/edge/assets/flags/lt.svg
dist/edge/assets/flags/lu.svg
dist/edge/assets/flags/lv.svg
dist/edge/assets/flags/ly.svg
dist/edge/assets/flags/ma.svg
dist/edge/assets/flags/mc.svg
dist/edge/assets/flags/md.svg
dist/edge/assets/flags/me.svg
dist/edge/assets/flags/mf.svg
dist/edge/assets/flags/mg.svg
dist/edge/assets/flags/mh.svg
dist/edge/assets/flags/mk.svg
dist/edge/assets/flags/ml.svg
dist/edge/assets/flags/mm.svg
dist/edge/assets/flags/mn.svg
dist/edge/assets/flags/mo.svg
dist/edge/assets/flags/mp.svg
dist/edge/assets/flags/mq.svg
dist/edge/assets/flags/mr.svg
dist/edge/assets/flags/ms.svg
dist/edge/assets/flags/mt.svg
dist/edge/assets/flags/mu.svg
dist/edge/assets/flags/mv.svg
dist/edge/assets/flags/mw.svg
dist/edge/assets/flags/mx.svg
dist/edge/assets/flags/my.svg
dist/edge/assets/flags/mz.svg
dist/edge/assets/flags/na.svg
dist/edge/assets/flags/nc.svg
dist/edge/assets/flags/ne.svg
dist/edge/assets/flags/nf.svg
dist/edge/assets/flags/ng.svg
dist/edge/assets/flags/ni.svg
dist/edge/assets/flags/nl.svg
dist/edge/assets/flags/no.svg
dist/edge/assets/flags/np.svg
dist/edge/assets/flags/nr.svg
dist/edge/assets/flags/nu.svg
dist/edge/assets/flags/nz.svg
dist/edge/assets/flags/om.svg
dist/edge/assets/flags/pa.svg
dist/edge/assets/flags/pe.svg
dist/edge/assets/flags/pf.svg
dist/edge/assets/flags/pg.svg
dist/edge/assets/flags/ph.svg
dist/edge/assets/flags/pk.svg
dist/edge/assets/flags/pl.svg
dist/edge/assets/flags/pm.svg
dist/edge/assets/flags/pn.svg
dist/edge/assets/flags/pr.svg
dist/edge/assets/flags/ps.svg
dist/edge/assets/flags/pt.svg
dist/edge/assets/flags/pw.svg
dist/edge/assets/flags/py.svg
dist/edge/assets/flags/qa.svg
dist/edge/assets/flags/re.svg
dist/edge/assets/flags/ro.svg
dist/edge/assets/flags/rs.svg
dist/edge/assets/flags/ru.svg
dist/edge/assets/flags/rw.svg
dist/edge/assets/flags/sa.svg
dist/edge/assets/flags/sb.svg
dist/edge/assets/flags/sc.svg
dist/edge/assets/flags/sd.svg
dist/edge/assets/flags/se.svg
dist/edge/assets/flags/sg.svg
dist/edge/assets/flags/sh.svg
dist/edge/assets/flags/si.svg
dist/edge/assets/flags/sj.svg
dist/edge/assets/flags/sk.svg
dist/edge/assets/flags/sl.svg
dist/edge/assets/flags/sm.svg
dist/edge/assets/flags/sn.svg
dist/edge/assets/flags/so.svg
dist/edge/assets/flags/sr.svg
dist/edge/assets/flags/ss.svg
dist/edge/assets/flags/st.svg
dist/edge/assets/flags/sv.svg
dist/edge/assets/flags/sx.svg
dist/edge/assets/flags/sy.svg
dist/edge/assets/flags/sz.svg
dist/edge/assets/flags/tc.svg
dist/edge/assets/flags/td.svg
dist/edge/assets/flags/tf.svg
dist/edge/assets/flags/tg.svg
dist/edge/assets/flags/th.svg
dist/edge/assets/flags/tj.svg
dist/edge/assets/flags/tk.svg
dist/edge/assets/flags/tl.svg
dist/edge/assets/flags/tm.svg
dist/edge/assets/flags/tn.svg
dist/edge/assets/flags/to.svg
dist/edge/assets/flags/tr.svg
dist/edge/assets/flags/tt.svg
dist/edge/assets/flags/tv.svg
dist/edge/assets/flags/tw.svg
dist/edge/assets/flags/tz.svg
dist/edge/assets/flags/ua.svg
dist/edge/assets/flags/ug.svg
dist/edge/assets/flags/um.svg
dist/edge/assets/flags/us.svg
dist/edge/assets/flags/uy.svg
dist/edge/assets/flags/uz.svg
dist/edge/assets/flags/va.svg
dist/edge/assets/flags/vc.svg
dist/edge/assets/flags/ve.svg
dist/edge/assets/flags/vg.svg
dist/edge/assets/flags/vi.svg
dist/edge/assets/flags/vn.svg
dist/edge/assets/flags/vu.svg
dist/edge/assets/flags/wf.svg
dist/edge/assets/flags/ws.svg
dist/edge/assets/flags/xk.svg
dist/edge/assets/flags/ye.svg
dist/edge/assets/flags/yt.svg
dist/edge/assets/flags/za.svg
dist/edge/assets/flags/zm.svg
dist/edge/assets/flags/zw.svg
dist/edge/assets/images/2400-1.png
dist/edge/assets/images/2400-2.png
dist/edge/assets/images/2400-3.png
dist/edge/assets/images/chrome.png
dist/edge/assets/images/edge.png
dist/edge/assets/images/firefox.png
dist/edge/assets/images/globo.png
dist/edge/assets/images/logo.png
dist/edge/assets/images/logo128.png
dist/edge/assets/images/logo16.png
dist/edge/assets/images/logo32.png
dist/edge/assets/images/logo48.png
dist/edge/assets/images/pix-qrcode.png
dist/edge/assets/pix-qrcode.png
dist/edge/css/style.css
dist/edge/game/index.html
dist/edge/js/app.js
dist/edge/js/background.js
dist/edge/js/challenges.js
dist/edge/js/cloud-save.js
dist/edge/js/countries.js
dist/edge/js/firebase-auth.js
dist/edge/js/i18n.js
dist/edge/js/locales-data.js
dist/edge/js/platform-capabilities.js
dist/edge/js/play-games-adapter.js
dist/edge/js/play-games-competitive.js
dist/edge/js/profile.js
dist/edge/js/ranking.js
dist/edge/js/storage.js
dist/edge/js/sync.js
dist/edge/js/world-challenge-storage.js
dist/edge/js/world-challenge-wallet.js
dist/edge/js/world-challenge.js
dist/edge/locales/ar.json
dist/edge/locales/bn.json
dist/edge/locales/de.json
dist/edge/locales/en.json
dist/edge/locales/es.json
dist/edge/locales/fr.json
dist/edge/locales/hi.json
dist/edge/locales/id.json
dist/edge/locales/it.json
dist/edge/locales/ja.json
dist/edge/locales/ko.json
dist/edge/locales/nl.json
dist/edge/locales/pl.json
dist/edge/locales/pt-BR.json
dist/edge/locales/ru.json
dist/edge/locales/th.json
dist/edge/locales/tr.json
dist/edge/locales/uk.json
dist/edge/locales/vi.json
dist/edge/locales/zh-CN.json
dist/edge/manifest.json
dist/firefox/assets/flags/ad.svg
dist/firefox/assets/flags/ae.svg
dist/firefox/assets/flags/af.svg
dist/firefox/assets/flags/ag.svg
dist/firefox/assets/flags/ai.svg
dist/firefox/assets/flags/al.svg
dist/firefox/assets/flags/am.svg
dist/firefox/assets/flags/ao.svg
dist/firefox/assets/flags/aq.svg
dist/firefox/assets/flags/ar.svg
dist/firefox/assets/flags/as.svg
dist/firefox/assets/flags/at.svg
dist/firefox/assets/flags/au.svg
dist/firefox/assets/flags/aw.svg
dist/firefox/assets/flags/ax.svg
dist/firefox/assets/flags/az.svg
dist/firefox/assets/flags/ba.svg
dist/firefox/assets/flags/bb.svg
dist/firefox/assets/flags/bd.svg
dist/firefox/assets/flags/be.svg
dist/firefox/assets/flags/bf.svg
dist/firefox/assets/flags/bg.svg
dist/firefox/assets/flags/bh.svg
dist/firefox/assets/flags/bi.svg
dist/firefox/assets/flags/bj.svg
dist/firefox/assets/flags/bl.svg
dist/firefox/assets/flags/bm.svg
dist/firefox/assets/flags/bn.svg
dist/firefox/assets/flags/bo.svg
dist/firefox/assets/flags/bq.svg
dist/firefox/assets/flags/br.svg
dist/firefox/assets/flags/bs.svg
dist/firefox/assets/flags/bt.svg
dist/firefox/assets/flags/bv.svg
dist/firefox/assets/flags/bw.svg
dist/firefox/assets/flags/by.svg
dist/firefox/assets/flags/bz.svg
dist/firefox/assets/flags/ca.svg
dist/firefox/assets/flags/cc.svg
dist/firefox/assets/flags/cd.svg
dist/firefox/assets/flags/cf.svg
dist/firefox/assets/flags/cg.svg
dist/firefox/assets/flags/ch.svg
dist/firefox/assets/flags/ci.svg
dist/firefox/assets/flags/ck.svg
dist/firefox/assets/flags/cl.svg
dist/firefox/assets/flags/cm.svg
dist/firefox/assets/flags/cn.svg
dist/firefox/assets/flags/co.svg
dist/firefox/assets/flags/cr.svg
dist/firefox/assets/flags/cu.svg
dist/firefox/assets/flags/cv.svg
dist/firefox/assets/flags/cw.svg
dist/firefox/assets/flags/cx.svg
dist/firefox/assets/flags/cy.svg
dist/firefox/assets/flags/cz.svg
dist/firefox/assets/flags/de.svg
dist/firefox/assets/flags/dj.svg
dist/firefox/assets/flags/dk.svg
dist/firefox/assets/flags/dm.svg
dist/firefox/assets/flags/do.svg
dist/firefox/assets/flags/dz.svg
dist/firefox/assets/flags/ec.svg
dist/firefox/assets/flags/ee.svg
dist/firefox/assets/flags/eg.svg
dist/firefox/assets/flags/eh.svg
dist/firefox/assets/flags/er.svg
dist/firefox/assets/flags/es.svg
dist/firefox/assets/flags/et.svg
dist/firefox/assets/flags/eu.svg
dist/firefox/assets/flags/fi.svg
dist/firefox/assets/flags/fj.svg
dist/firefox/assets/flags/fk.svg
dist/firefox/assets/flags/fm.svg
dist/firefox/assets/flags/fo.svg
dist/firefox/assets/flags/fr.svg
dist/firefox/assets/flags/ga.svg
dist/firefox/assets/flags/gb-eng.svg
dist/firefox/assets/flags/gb-nir.svg
dist/firefox/assets/flags/gb-sct.svg
dist/firefox/assets/flags/gb-wls.svg
dist/firefox/assets/flags/gb.svg
dist/firefox/assets/flags/gd.svg
dist/firefox/assets/flags/ge.svg
dist/firefox/assets/flags/gf.svg
dist/firefox/assets/flags/gg.svg
dist/firefox/assets/flags/gh.svg
dist/firefox/assets/flags/gi.svg
dist/firefox/assets/flags/gl.svg
dist/firefox/assets/flags/gm.svg
dist/firefox/assets/flags/gn.svg
dist/firefox/assets/flags/gp.svg
dist/firefox/assets/flags/gq.svg
dist/firefox/assets/flags/gr.svg
dist/firefox/assets/flags/gs.svg
dist/firefox/assets/flags/gt.svg
dist/firefox/assets/flags/gu.svg
dist/firefox/assets/flags/gw.svg
dist/firefox/assets/flags/gy.svg
dist/firefox/assets/flags/hk.svg
dist/firefox/assets/flags/hm.svg
dist/firefox/assets/flags/hn.svg
dist/firefox/assets/flags/hr.svg
dist/firefox/assets/flags/ht.svg
dist/firefox/assets/flags/hu.svg
dist/firefox/assets/flags/id.svg
dist/firefox/assets/flags/ie.svg
dist/firefox/assets/flags/il.svg
dist/firefox/assets/flags/im.svg
dist/firefox/assets/flags/in.svg
dist/firefox/assets/flags/io.svg
dist/firefox/assets/flags/iq.svg
dist/firefox/assets/flags/ir.svg
dist/firefox/assets/flags/is.svg
dist/firefox/assets/flags/it.svg
dist/firefox/assets/flags/je.svg
dist/firefox/assets/flags/jm.svg
dist/firefox/assets/flags/jo.svg
dist/firefox/assets/flags/jp.svg
dist/firefox/assets/flags/ke.svg
dist/firefox/assets/flags/kg.svg
dist/firefox/assets/flags/kh.svg
dist/firefox/assets/flags/ki.svg
dist/firefox/assets/flags/km.svg
dist/firefox/assets/flags/kn.svg
dist/firefox/assets/flags/kp.svg
dist/firefox/assets/flags/kr.svg
dist/firefox/assets/flags/kw.svg
dist/firefox/assets/flags/ky.svg
dist/firefox/assets/flags/kz.svg
dist/firefox/assets/flags/la.svg
dist/firefox/assets/flags/lb.svg
dist/firefox/assets/flags/lc.svg
dist/firefox/assets/flags/li.svg
dist/firefox/assets/flags/lk.svg
dist/firefox/assets/flags/lr.svg
dist/firefox/assets/flags/ls.svg
dist/firefox/assets/flags/lt.svg
dist/firefox/assets/flags/lu.svg
dist/firefox/assets/flags/lv.svg
dist/firefox/assets/flags/ly.svg
dist/firefox/assets/flags/ma.svg
dist/firefox/assets/flags/mc.svg
dist/firefox/assets/flags/md.svg
dist/firefox/assets/flags/me.svg
dist/firefox/assets/flags/mf.svg
dist/firefox/assets/flags/mg.svg
dist/firefox/assets/flags/mh.svg
dist/firefox/assets/flags/mk.svg
dist/firefox/assets/flags/ml.svg
dist/firefox/assets/flags/mm.svg
dist/firefox/assets/flags/mn.svg
dist/firefox/assets/flags/mo.svg
dist/firefox/assets/flags/mp.svg
dist/firefox/assets/flags/mq.svg
dist/firefox/assets/flags/mr.svg
dist/firefox/assets/flags/ms.svg
dist/firefox/assets/flags/mt.svg
dist/firefox/assets/flags/mu.svg
dist/firefox/assets/flags/mv.svg
dist/firefox/assets/flags/mw.svg
dist/firefox/assets/flags/mx.svg
dist/firefox/assets/flags/my.svg
dist/firefox/assets/flags/mz.svg
dist/firefox/assets/flags/na.svg
dist/firefox/assets/flags/nc.svg
dist/firefox/assets/flags/ne.svg
dist/firefox/assets/flags/nf.svg
dist/firefox/assets/flags/ng.svg
dist/firefox/assets/flags/ni.svg
dist/firefox/assets/flags/nl.svg
dist/firefox/assets/flags/no.svg
dist/firefox/assets/flags/np.svg
dist/firefox/assets/flags/nr.svg
dist/firefox/assets/flags/nu.svg
dist/firefox/assets/flags/nz.svg
dist/firefox/assets/flags/om.svg
dist/firefox/assets/flags/pa.svg
dist/firefox/assets/flags/pe.svg
dist/firefox/assets/flags/pf.svg
dist/firefox/assets/flags/pg.svg
dist/firefox/assets/flags/ph.svg
dist/firefox/assets/flags/pk.svg
dist/firefox/assets/flags/pl.svg
dist/firefox/assets/flags/pm.svg
dist/firefox/assets/flags/pn.svg
dist/firefox/assets/flags/pr.svg
dist/firefox/assets/flags/ps.svg
dist/firefox/assets/flags/pt.svg
dist/firefox/assets/flags/pw.svg
dist/firefox/assets/flags/py.svg
dist/firefox/assets/flags/qa.svg
dist/firefox/assets/flags/re.svg
dist/firefox/assets/flags/ro.svg
dist/firefox/assets/flags/rs.svg
dist/firefox/assets/flags/ru.svg
dist/firefox/assets/flags/rw.svg
dist/firefox/assets/flags/sa.svg
dist/firefox/assets/flags/sb.svg
dist/firefox/assets/flags/sc.svg
dist/firefox/assets/flags/sd.svg
dist/firefox/assets/flags/se.svg
dist/firefox/assets/flags/sg.svg
dist/firefox/assets/flags/sh.svg
dist/firefox/assets/flags/si.svg
dist/firefox/assets/flags/sj.svg
dist/firefox/assets/flags/sk.svg
dist/firefox/assets/flags/sl.svg
dist/firefox/assets/flags/sm.svg
dist/firefox/assets/flags/sn.svg
dist/firefox/assets/flags/so.svg
dist/firefox/assets/flags/sr.svg
dist/firefox/assets/flags/ss.svg
dist/firefox/assets/flags/st.svg
dist/firefox/assets/flags/sv.svg
dist/firefox/assets/flags/sx.svg
dist/firefox/assets/flags/sy.svg
dist/firefox/assets/flags/sz.svg
dist/firefox/assets/flags/tc.svg
dist/firefox/assets/flags/td.svg
dist/firefox/assets/flags/tf.svg
dist/firefox/assets/flags/tg.svg
dist/firefox/assets/flags/th.svg
dist/firefox/assets/flags/tj.svg
dist/firefox/assets/flags/tk.svg
dist/firefox/assets/flags/tl.svg
dist/firefox/assets/flags/tm.svg
dist/firefox/assets/flags/tn.svg
dist/firefox/assets/flags/to.svg
dist/firefox/assets/flags/tr.svg
dist/firefox/assets/flags/tt.svg
dist/firefox/assets/flags/tv.svg
dist/firefox/assets/flags/tw.svg
dist/firefox/assets/flags/tz.svg
dist/firefox/assets/flags/ua.svg
dist/firefox/assets/flags/ug.svg
dist/firefox/assets/flags/um.svg
dist/firefox/assets/flags/us.svg
dist/firefox/assets/flags/uy.svg
dist/firefox/assets/flags/uz.svg
dist/firefox/assets/flags/va.svg
dist/firefox/assets/flags/vc.svg
dist/firefox/assets/flags/ve.svg
dist/firefox/assets/flags/vg.svg
dist/firefox/assets/flags/vi.svg
dist/firefox/assets/flags/vn.svg
dist/firefox/assets/flags/vu.svg
dist/firefox/assets/flags/wf.svg
dist/firefox/assets/flags/ws.svg
dist/firefox/assets/flags/xk.svg
dist/firefox/assets/flags/ye.svg
dist/firefox/assets/flags/yt.svg
dist/firefox/assets/flags/za.svg
dist/firefox/assets/flags/zm.svg
dist/firefox/assets/flags/zw.svg
dist/firefox/assets/images/2400-1.png
dist/firefox/assets/images/2400-2.png
dist/firefox/assets/images/2400-3.png
dist/firefox/assets/images/chrome.png
dist/firefox/assets/images/edge.png
dist/firefox/assets/images/firefox.png
dist/firefox/assets/images/globo.png
dist/firefox/assets/images/logo.png
dist/firefox/assets/images/logo128.png
dist/firefox/assets/images/logo16.png
dist/firefox/assets/images/logo32.png
dist/firefox/assets/images/logo48.png
dist/firefox/assets/images/pix-qrcode.png
dist/firefox/assets/pix-qrcode.png
dist/firefox/css/style.css
dist/firefox/game/index.html
dist/firefox/js/app.js
dist/firefox/js/background.js
dist/firefox/js/challenges.js
dist/firefox/js/cloud-save.js
dist/firefox/js/countries.js
dist/firefox/js/firebase-auth.js
dist/firefox/js/i18n.js
dist/firefox/js/locales-data.js
dist/firefox/js/platform-capabilities.js
dist/firefox/js/play-games-adapter.js
dist/firefox/js/play-games-competitive.js
dist/firefox/js/profile.js
dist/firefox/js/ranking.js
dist/firefox/js/storage.js
dist/firefox/js/sync.js
dist/firefox/js/world-challenge-storage.js
dist/firefox/js/world-challenge-wallet.js
dist/firefox/js/world-challenge.js
dist/firefox/locales/ar.json
dist/firefox/locales/bn.json
dist/firefox/locales/de.json
dist/firefox/locales/en.json
dist/firefox/locales/es.json
dist/firefox/locales/fr.json
dist/firefox/locales/hi.json
dist/firefox/locales/id.json
dist/firefox/locales/it.json
dist/firefox/locales/ja.json
dist/firefox/locales/ko.json
dist/firefox/locales/nl.json
dist/firefox/locales/pl.json
dist/firefox/locales/pt-BR.json
dist/firefox/locales/ru.json
dist/firefox/locales/th.json
dist/firefox/locales/tr.json
dist/firefox/locales/uk.json
dist/firefox/locales/vi.json
dist/firefox/locales/zh-CN.json
dist/firefox/manifest.json
dist/packages/flag-game-chrome-1.1.0.zip
dist/packages/flag-game-edge-1.1.0.zip
dist/packages/flag-game-firefox-1.1.0.zip
"divulga\303\247\303\243o/1400-560.jpg"
"divulga\303\247\303\243o/300.png"
"divulga\303\247\303\243o/440-280.jpg"
"divulga\303\247\303\243o/ChatGPT Image 11 de jul. de 2026, 14_17_23.png"
"divulga\303\247\303\243o/ChatGPT Image 11 de jul. de 2026, 14_53_21.png"
"divulga\303\247\303\243o/ChatGPT Image 12 de jul. de 2026, 20_00_00.png"
"divulga\303\247\303\243o/flag-game-resultado (1).png"
"divulga\303\247\303\243o/flag-game-resultado.png"
"divulga\303\247\303\243o/print-2.jpg"
"divulga\303\247\303\243o/print-3.jpg"
"divulga\303\247\303\243o/print-4.jpg"
"divulga\303\247\303\243o/print-5.jpg"
"divulga\303\247\303\243o/print1.jpg"
docs/firebase-auth-architecture.md
docs/homepage/FINAL_AUDIT.md
docs/homepage/FLAG_GAME_DESIGN_SYSTEM.md
docs/homepage/FLAG_GAME_HOMEPAGE_COPY.md
docs/homepage/FLAG_GAME_HOMEPAGE_IMPLEMENTATION_PLAN.md
docs/homepage/FLAG_GAME_HOMEPAGE_REVIEW.md
docs/homepage/FLAG_GAME_HOMEPAGE_SPEC.md
docs/homepage/IMPLEMENTATION_RULES.md
docs/homepage/PUBLICATION_CHECKLIST.md
docs/online-ranking-architecture.md
docs/sync-strategy.md
docs/world-challenge/AUDIT.md
docs/world-challenge/CLOUD_SAVE.md
docs/world-challenge/CURRENT_DATA.md
docs/world-challenge/DATA_MIGRATION.md
docs/world-challenge/ENGINE.md
docs/world-challenge/GOOGLE_PLAY_GAMES_ANDROID.md
docs/world-challenge/IMPLEMENTATION_PLAN.md
docs/world-challenge/PERSISTENCE.md
docs/world-challenge/PLATFORM_MATRIX.md
docs/world-challenge/PLAY_GAMES_CHECKLIST.md
game/index.html
homepage/assets/logo-homepage.png
homepage/css/base.css
homepage/css/components.css
homepage/css/responsive.css
homepage/css/sections.css
homepage/css/tokens.css
homepage/js/homepage-i18n.js
homepage/js/homepage.js
js/challenges.js
js/cloud-save.js
js/firebase-auth.js
js/locales-data.js
js/platform-capabilities.js
js/play-games-adapter.js
js/play-games-competitive.js
js/profile.js
js/ranking.js
js/storage.js
js/sync.js
js/world-challenge-storage.js
js/world-challenge-wallet.js
js/world-challenge.js
manifests/manifest.chrome.json
manifests/manifest.edge.json
manifests/manifest.firefox.json
plugins/capacitor-play-games/android/build.gradle
plugins/capacitor-play-games/android/src/main/AndroidManifest.xml
plugins/capacitor-play-games/android/src/main/java/app/flaggame/playgames/FlagGamePlayGamesPlugin.java
plugins/capacitor-play-games/android/src/main/res/values/play_games_ids.xml
plugins/capacitor-play-games/package.json
plugins/capacitor-play-games/src/definitions.ts
plugins/capacitor-play-games/src/index.ts
robots.txt
scripts/build-extensions.js
tests/cloud-save.test.js
tests/platform-capabilities.test.js
tests/play-games-adapter.test.js
tests/play-games-competitive.test.js
tests/world-challenge-storage.test.js
tests/world-challenge-wallet.test.js
tests/world-challenge.test.js
~~~

## Estado e classificacao de arquivos

- Linhas em `git status --short`: 53.
- Arquivos untracked em `git ls-files --others --exclude-standard`: 1024.
- Arquivos untracked sob `dist/`: 933.
- ZIPs untracked: 4.
- Testes untracked: 7.
- Docs world-challenge untracked: 10.
- Arquivos do plugin Capacitor untracked: 7.
- `dist/` rastreado por Git: nao.
- ZIPs rastreados por Git: nao.

Classificacao por arquivo em estado Git:

| Origem | Marcador | Arquivo | Classificacao | Observacao |
| --- | --- | --- | --- | --- |
| git status | M | `css/style.css` | codigo de producao CSS |  |
| git status | M | `index.html` | codigo de producao HTML/site |  |
| git status | M | `js/app.js` | codigo de producao JS |  |
| git status | M | `js/background.js` | codigo de producao JS |  |
| git status | M | `js/i18n.js` | codigo de producao JS |  |
| git status | M | `locales/ar.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/bn.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/de.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/en.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/es.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/fr.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/hi.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/id.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/it.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/ja.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/ko.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/nl.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/pl.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/pt-BR.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/ru.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/th.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/tr.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/uk.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/vi.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `locales/zh-CN.json` | traducao | arquivo de idioma carregado pela arquitetura i18n |
| git status | M | `manifest.json` | config de extensao |  |
| git status | ?? | `Flaggame.zip` | pacote de distribuicao / provavelmente nao versionar | artefato gerado para publicacao; nao aparece em git diff --stat se estiver untracked |
| git status | ?? | `assets/images/` | asset de producao |  |
| git status | ?? | `assets/pix-qrcode.png` | asset de producao |  |
| git status | ?? | `dist/` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git status | ?? | `"divulga/303/247/303/243o/"` | arquivo de projeto |  |
| git status | ?? | `docs/` | documentacao |  |
| git status | ?? | `game/` | codigo de producao HTML/UI |  |
| git status | ?? | `homepage/` | arquivo de projeto |  |
| git status | ?? | `js/challenges.js` | codigo de producao JS |  |
| git status | ?? | `js/cloud-save.js` | codigo de producao JS |  |
| git status | ?? | `js/firebase-auth.js` | codigo de producao JS |  |
| git status | ?? | `js/locales-data.js` | gerado / bundle de traducoes | derivado dos locales, mas carregado em runtime |
| git status | ?? | `js/platform-capabilities.js` | codigo de producao JS |  |
| git status | ?? | `js/play-games-adapter.js` | codigo de producao JS |  |
| git status | ?? | `js/play-games-competitive.js` | codigo de producao JS |  |
| git status | ?? | `js/profile.js` | codigo de producao JS |  |
| git status | ?? | `js/ranking.js` | codigo de producao JS |  |
| git status | ?? | `js/storage.js` | codigo de producao JS |  |
| git status | ?? | `js/sync.js` | codigo de producao JS |  |
| git status | ?? | `js/world-challenge-storage.js` | codigo de producao JS |  |
| git status | ?? | `js/world-challenge-wallet.js` | codigo de producao JS |  |
| git status | ?? | `js/world-challenge.js` | codigo de producao JS |  |
| git status | ?? | `manifests/` | arquivo de projeto |  |
| git status | ?? | `plugins/` | arquivo de projeto |  |
| git status | ?? | `robots.txt` | arquivo de projeto |  |
| git status | ?? | `scripts/` | arquivo de projeto |  |
| git status | ?? | `tests/` | teste | testes Node/JS com mocks; nao exercitam Android real |
| git ls-files --others | ?? | `assets/images/2400-1.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/2400-2.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/2400-3.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/chrome.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/edge.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/firefox.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/globo.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/logo.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/logo128.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/logo16.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/logo32.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/logo48.png` | asset de producao |  |
| git ls-files --others | ?? | `assets/images/pix-qrcode.png` | asset de producao |  |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ad.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ae.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/af.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ag.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ai.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/al.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/am.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ao.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/aq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ar.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/as.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/at.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/au.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/aw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ax.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/az.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ba.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/be.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/br.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/by.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/bz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ca.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ch.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ci.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ck.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/co.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/cz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/de.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/dj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/dk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/dm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/do.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/dz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ec.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ee.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/eg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/eh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/er.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/es.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/et.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/eu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/fi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/fj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/fk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/fm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/fo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/fr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ga.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gb-eng.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gb-nir.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gb-sct.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gb-wls.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ge.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/gy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/hk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/hm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/hn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/hr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ht.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/hu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/id.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ie.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/il.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/im.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/in.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/io.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/iq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ir.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/is.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/it.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/je.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/jm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/jo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/jp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ke.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/kg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/kh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ki.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/km.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/kn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/kp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/kr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/kw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ky.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/kz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/la.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/lb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/lc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/li.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/lk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/lr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ls.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/lt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/lu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/lv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ly.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ma.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/md.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/me.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ml.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ms.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/my.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/mz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/na.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/nc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ne.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/nf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ng.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ni.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/nl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/no.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/np.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/nr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/nu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/nz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/om.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pe.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ph.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ps.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/pw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/py.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/qa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/re.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ro.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/rs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ru.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/rw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/se.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/si.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/so.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ss.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/st.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/sz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/td.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/th.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/to.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/tz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ua.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ug.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/um.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/us.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/uy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/uz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/va.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/vc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ve.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/vg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/vi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/vn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/vu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/wf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ws.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/xk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/ye.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/yt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/za.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/zm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/flags/zw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/2400-1.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/2400-2.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/2400-3.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/chrome.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/edge.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/firefox.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/globo.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/logo.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/logo128.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/logo16.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/logo32.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/logo48.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/images/pix-qrcode.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/assets/pix-qrcode.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/css/style.css` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/game/index.html` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/app.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/background.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/challenges.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/cloud-save.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/countries.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/firebase-auth.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/i18n.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/locales-data.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/platform-capabilities.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/play-games-adapter.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/play-games-competitive.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/profile.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/ranking.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/storage.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/sync.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/world-challenge-storage.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/world-challenge-wallet.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/js/world-challenge.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/ar.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/bn.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/de.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/en.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/es.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/fr.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/hi.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/id.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/it.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/ja.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/ko.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/nl.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/pl.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/pt-BR.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/ru.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/th.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/tr.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/uk.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/vi.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/locales/zh-CN.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/chrome/manifest.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ad.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ae.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/af.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ag.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ai.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/al.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/am.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ao.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/aq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ar.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/as.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/at.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/au.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/aw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ax.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/az.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ba.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/be.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/br.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/by.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/bz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ca.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ch.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ci.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ck.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/co.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/cz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/de.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/dj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/dk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/dm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/do.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/dz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ec.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ee.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/eg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/eh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/er.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/es.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/et.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/eu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/fi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/fj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/fk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/fm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/fo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/fr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ga.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gb-eng.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gb-nir.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gb-sct.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gb-wls.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ge.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/gy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/hk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/hm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/hn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/hr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ht.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/hu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/id.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ie.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/il.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/im.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/in.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/io.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/iq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ir.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/is.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/it.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/je.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/jm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/jo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/jp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ke.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/kg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/kh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ki.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/km.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/kn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/kp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/kr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/kw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ky.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/kz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/la.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/lb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/lc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/li.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/lk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/lr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ls.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/lt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/lu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/lv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ly.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ma.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/md.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/me.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ml.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ms.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/my.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/mz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/na.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/nc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ne.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/nf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ng.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ni.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/nl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/no.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/np.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/nr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/nu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/nz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/om.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pe.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ph.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ps.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/pw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/py.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/qa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/re.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ro.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/rs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ru.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/rw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/se.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/si.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/so.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ss.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/st.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/sz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/td.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/th.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/to.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/tz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ua.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ug.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/um.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/us.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/uy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/uz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/va.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/vc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ve.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/vg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/vi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/vn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/vu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/wf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ws.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/xk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/ye.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/yt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/za.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/zm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/flags/zw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/2400-1.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/2400-2.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/2400-3.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/chrome.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/edge.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/firefox.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/globo.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/logo.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/logo128.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/logo16.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/logo32.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/logo48.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/images/pix-qrcode.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/assets/pix-qrcode.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/css/style.css` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/game/index.html` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/app.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/background.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/challenges.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/cloud-save.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/countries.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/firebase-auth.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/i18n.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/locales-data.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/platform-capabilities.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/play-games-adapter.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/play-games-competitive.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/profile.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/ranking.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/storage.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/sync.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/world-challenge-storage.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/world-challenge-wallet.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/js/world-challenge.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/ar.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/bn.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/de.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/en.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/es.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/fr.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/hi.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/id.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/it.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/ja.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/ko.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/nl.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/pl.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/pt-BR.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/ru.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/th.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/tr.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/uk.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/vi.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/locales/zh-CN.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/edge/manifest.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ad.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ae.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/af.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ag.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ai.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/al.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/am.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ao.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/aq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ar.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/as.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/at.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/au.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/aw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ax.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/az.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ba.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/be.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/br.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/by.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/bz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ca.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ch.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ci.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ck.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/co.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/cz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/de.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/dj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/dk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/dm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/do.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/dz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ec.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ee.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/eg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/eh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/er.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/es.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/et.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/eu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/fi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/fj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/fk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/fm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/fo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/fr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ga.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gb-eng.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gb-nir.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gb-sct.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gb-wls.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ge.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/gy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/hk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/hm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/hn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/hr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ht.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/hu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/id.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ie.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/il.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/im.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/in.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/io.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/iq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ir.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/is.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/it.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/je.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/jm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/jo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/jp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ke.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/kg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/kh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ki.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/km.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/kn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/kp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/kr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/kw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ky.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/kz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/la.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/lb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/lc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/li.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/lk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/lr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ls.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/lt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/lu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/lv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ly.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ma.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/md.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/me.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ml.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mo.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mp.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mq.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ms.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/my.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/mz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/na.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/nc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ne.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/nf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ng.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ni.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/nl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/no.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/np.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/nr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/nu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/nz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/om.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pe.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ph.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ps.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/pw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/py.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/qa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/re.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ro.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/rs.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ru.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/rw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sa.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sb.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sd.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/se.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sh.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/si.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/so.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ss.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/st.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sx.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/sz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/td.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/th.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tj.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tl.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/to.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tr.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tv.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/tz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ua.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ug.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/um.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/us.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/uy.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/uz.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/va.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/vc.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ve.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/vg.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/vi.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/vn.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/vu.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/wf.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ws.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/xk.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/ye.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/yt.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/za.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/zm.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/flags/zw.svg` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/2400-1.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/2400-2.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/2400-3.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/chrome.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/edge.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/firefox.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/globo.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/logo.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/logo128.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/logo16.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/logo32.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/logo48.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/images/pix-qrcode.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/assets/pix-qrcode.png` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/css/style.css` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/game/index.html` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/app.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/background.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/challenges.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/cloud-save.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/countries.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/firebase-auth.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/i18n.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/locales-data.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/platform-capabilities.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/play-games-adapter.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/play-games-competitive.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/profile.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/ranking.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/storage.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/sync.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/world-challenge-storage.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/world-challenge-wallet.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/js/world-challenge.js` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/ar.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/bn.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/de.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/en.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/es.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/fr.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/hi.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/id.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/it.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/ja.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/ko.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/nl.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/pl.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/pt-BR.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/ru.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/th.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/tr.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/uk.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/vi.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/locales/zh-CN.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/firefox/manifest.json` | gerado / distribuicao / provavelmente nao versionar | saida de build das extensoes; atualmente untracked |
| git ls-files --others | ?? | `dist/packages/flag-game-chrome-1.1.0.zip` | pacote de distribuicao / provavelmente nao versionar | artefato gerado para publicacao; nao aparece em git diff --stat se estiver untracked |
| git ls-files --others | ?? | `dist/packages/flag-game-edge-1.1.0.zip` | pacote de distribuicao / provavelmente nao versionar | artefato gerado para publicacao; nao aparece em git diff --stat se estiver untracked |
| git ls-files --others | ?? | `dist/packages/flag-game-firefox-1.1.0.zip` | pacote de distribuicao / provavelmente nao versionar | artefato gerado para publicacao; nao aparece em git diff --stat se estiver untracked |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/1400-560.jpg"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/300.png"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/440-280.jpg"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/ChatGPT Image 11 de jul. de 2026, 14_17_23.png"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/ChatGPT Image 11 de jul. de 2026, 14_53_21.png"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/ChatGPT Image 12 de jul. de 2026, 20_00_00.png"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/flag-game-resultado (1).png"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/flag-game-resultado.png"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/print-2.jpg"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/print-3.jpg"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/print-4.jpg"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/print-5.jpg"` | arquivo de projeto |  |
| git ls-files --others | ?? | `"divulga/303/247/303/243o/print1.jpg"` | arquivo de projeto |  |
| git ls-files --others | ?? | `docs/firebase-auth-architecture.md` | documentacao |  |
| git ls-files --others | ?? | `docs/homepage/FINAL_AUDIT.md` | documentacao |  |
| git ls-files --others | ?? | `docs/homepage/FLAG_GAME_DESIGN_SYSTEM.md` | documentacao |  |
| git ls-files --others | ?? | `docs/homepage/FLAG_GAME_HOMEPAGE_COPY.md` | documentacao |  |
| git ls-files --others | ?? | `docs/homepage/FLAG_GAME_HOMEPAGE_IMPLEMENTATION_PLAN.md` | documentacao |  |
| git ls-files --others | ?? | `docs/homepage/FLAG_GAME_HOMEPAGE_REVIEW.md` | documentacao |  |
| git ls-files --others | ?? | `docs/homepage/FLAG_GAME_HOMEPAGE_SPEC.md` | documentacao |  |
| git ls-files --others | ?? | `docs/homepage/IMPLEMENTATION_RULES.md` | documentacao |  |
| git ls-files --others | ?? | `docs/homepage/PUBLICATION_CHECKLIST.md` | documentacao |  |
| git ls-files --others | ?? | `docs/online-ranking-architecture.md` | documentacao |  |
| git ls-files --others | ?? | `docs/sync-strategy.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/AUDIT.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/CLOUD_SAVE.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/CURRENT_DATA.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/DATA_MIGRATION.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/ENGINE.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/GOOGLE_PLAY_GAMES_ANDROID.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/IMPLEMENTATION_PLAN.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/PERSISTENCE.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/PLATFORM_MATRIX.md` | documentacao |  |
| git ls-files --others | ?? | `docs/world-challenge/PLAY_GAMES_CHECKLIST.md` | documentacao |  |
| git ls-files --others | ?? | `game/index.html` | codigo de producao HTML/UI |  |
| git ls-files --others | ?? | `homepage/assets/logo-homepage.png` | arquivo de projeto |  |
| git ls-files --others | ?? | `homepage/css/base.css` | arquivo de projeto |  |
| git ls-files --others | ?? | `homepage/css/components.css` | arquivo de projeto |  |
| git ls-files --others | ?? | `homepage/css/responsive.css` | arquivo de projeto |  |
| git ls-files --others | ?? | `homepage/css/sections.css` | arquivo de projeto |  |
| git ls-files --others | ?? | `homepage/css/tokens.css` | arquivo de projeto |  |
| git ls-files --others | ?? | `homepage/js/homepage-i18n.js` | arquivo de projeto |  |
| git ls-files --others | ?? | `homepage/js/homepage.js` | arquivo de projeto |  |
| git ls-files --others | ?? | `manifests/manifest.chrome.json` | arquivo de projeto |  |
| git ls-files --others | ?? | `manifests/manifest.edge.json` | arquivo de projeto |  |
| git ls-files --others | ?? | `manifests/manifest.firefox.json` | arquivo de projeto |  |
| git ls-files --others | ?? | `plugins/capacitor-play-games/android/build.gradle` | config nativa Android | Gradle/manifest do plugin local |
| git ls-files --others | ?? | `plugins/capacitor-play-games/android/src/main/AndroidManifest.xml` | config nativa Android | Gradle/manifest do plugin local |
| git ls-files --others | ?? | `plugins/capacitor-play-games/android/src/main/java/app/flaggame/playgames/FlagGamePlayGamesPlugin.java` | codigo nativo Android | plugin Capacitor local; nao e app Android completo |
| git ls-files --others | ?? | `plugins/capacitor-play-games/android/src/main/res/values/play_games_ids.xml` | config nativa Android | recursos XML com IDs vazios/placeholders |
| git ls-files --others | ?? | `plugins/capacitor-play-games/package.json` | config de plugin | pacote local do plugin Capacitor |
| git ls-files --others | ?? | `plugins/capacitor-play-games/src/definitions.ts` | codigo de plugin JS/TypeScript | contrato Capacitor, nao app nativo executavel por si so |
| git ls-files --others | ?? | `plugins/capacitor-play-games/src/index.ts` | codigo de plugin JS/TypeScript | contrato Capacitor, nao app nativo executavel por si so |
| git ls-files --others | ?? | `scripts/build-extensions.js` | arquivo de projeto |  |
| git ls-files --others | ?? | `tests/cloud-save.test.js` | teste | testes Node/JS com mocks; nao exercitam Android real |
| git ls-files --others | ?? | `tests/platform-capabilities.test.js` | teste | testes Node/JS com mocks; nao exercitam Android real |
| git ls-files --others | ?? | `tests/play-games-adapter.test.js` | teste | testes Node/JS com mocks; nao exercitam Android real |
| git ls-files --others | ?? | `tests/play-games-competitive.test.js` | teste | testes Node/JS com mocks; nao exercitam Android real |
| git ls-files --others | ?? | `tests/world-challenge-storage.test.js` | teste | testes Node/JS com mocks; nao exercitam Android real |
| git ls-files --others | ?? | `tests/world-challenge-wallet.test.js` | teste | testes Node/JS com mocks; nao exercitam Android real |
| git ls-files --others | ?? | `tests/world-challenge.test.js` | teste | testes Node/JS com mocks; nao exercitam Android real |

Arquivos que provavelmente nao deveriam ser versionados: todos sob `dist/` e `dist/packages/*.zip`, por serem saidas geradas de extensoes/pacotes. Nesta auditoria eles estao untracked; se forem commitados, entram como artefatos de distribuicao e podem ficar defasados do fonte.

## Auditoria do Desafio Mundial

| Item | Evidencia | Teste | Real vs mock | Conclusao |
| --- | --- | --- | --- | --- |
| Identificador `world_challenge` | `js/world-challenge.js:9`, `js/world-challenge-storage.js:12`, `js/app.js:321` | `tests/world-challenge.test.js:59`, `tests/world-challenge-storage.test.js:55` | Real JS | Implementado. |
| Preservacao do legado | `js/world-challenge.js:10` usa `legacyMode: expert`; `js/profile.js:167-168` separa `expert` e `world_challenge`; `tests/world-challenge-storage.test.js:179-238` | JS com fake storage | Real JS para dados locais; nao ha conversao para `expert_legacy` literal | Dados antigos sao preservados como `expert`; a implementacao nao usa identificador literal `expert_legacy`. Recuperacao do modo digitado antigo depende do historico Git, porque a UI atual substituiu a experiencia visual. |
| 195 paises | `js/world-challenge.js:12`, `createGame` em `js/world-challenge.js:367-421` | `tests/world-challenge.test.js:62`; conclusao reduzida testada com subconjunto em `:203-222` | Real JS | Implementado no contrato; teste de conclusao usa subconjunto, nao as 195 bandeiras reais. |
| Cinco vidas | `INITIAL_LIVES` em `js/world-challenge.js:11`, estado em `:389-390`, UI em `game/index.html:259` e `js/app.js:1558` | `tests/world-challenge.test.js:63`, `:108-111`, `:198-200` | Real JS | Implementado. |
| Quatro alternativas unicas | `OPTION_COUNT` em `js/world-challenge.js:13`, `buildOptions` em `:217-253` | `tests/world-challenge.test.js:65-67` | Real JS | Implementado; distratores sao escolhidos por metadados/ordem JS, nao verificado visualmente nesta auditoria. |
| Fila de repeticao | `retryQueue` em `js/world-challenge.js:282-308`, `enqueueRetry` em `:442-453` | `tests/world-challenge.test.js:95-117`, `:136-180` | Real JS | Implementado; evita repeticao imediata quando ha paises suficientes e forca quando restam poucos. |
| Distancia minima de repeticao | `REPEAT_DISTANCE = 10` em `js/world-challenge.js:14`, selecao em `:282-308` | `tests/world-challenge.test.js:136-180` | Real JS | Implementado com relaxamento; nao ha teste exaustivo com 195 paises completos. |
| Bloqueio de resposta duplicada | `ensurePlaying` em `js/world-challenge.js:421-435`; `questionId` em `:265`, `answer` em `:456-524`, `skip` em `:554-580` | `tests/world-challenge.test.js:225-256` | Real JS | Implementado. |
| Acerto nao perde vida e aumenta progresso | `answer` em `js/world-challenge.js:477-508` | `tests/world-challenge.test.js:75-92` | Real JS | Implementado. |
| Erro perde vida, zera sequencia e retorna a fila | `answer` em `js/world-challenge.js:514-524` | `tests/world-challenge.test.js:95-117` | Real JS | Implementado. |
| “Nao sei” perde vida e retorna a fila | `skip` em `js/world-challenge.js:554-580`; UI `game/index.html:348`; handler `js/app.js:2014-2015` | `tests/world-challenge.test.js:118-134` | Real JS | Implementado. |
| Fim por zero vidas | `answer`/`skip` e status `game_over`; `continueGame` separado em `js/world-challenge.js:627` | `tests/world-challenge.test.js:180-200` | Real JS | Implementado. |
| Conclusao dos 195 | `answer` finaliza quando `answeredCorrect.length >= countriesTotal` em `js/world-challenge.js:507-508` | `tests/world-challenge.test.js:203-222` | Real JS | Implementado; teste usa lista curta. |
| Nenhuma bandeira conta duas vezes | `answeredCorrect.includes` em `js/world-challenge.js:477-480`, `enqueueRetry` ignora corretas em `:442-443` | `tests/world-challenge.test.js:218-222` | Real JS | Implementado. |
| Cronometro total | `elapsedMs`/summary em `js/world-challenge.js:672-688`; UI timer `js/app.js:1996-2000` | Coberto indiretamente por storage e summaries | Real JS/UI | Implementado para exibicao/resultado; restauracao de partida em andamento nao foi comprovada. |
| Sequencia atual e melhor sequencia | Estado e summary em `js/world-challenge.js`; resultado em `js/app.js:1912-1973` | `tests/world-challenge.test.js:91-92`, storage stats `:151-153` | Real JS | Implementado. |
| Feedback e nome correto apos erro | UI `js/app.js:1628-1655`; live region `game/index.html:313-325` | Nao ha teste DOM/E2E | Real UI sem teste automatizado DOM | Implementado visualmente no HTML/JS, mas sem teste E2E. |
| Tela final | `game/index.html:386-438`, `js/app.js:1912-1977` | Nao ha teste DOM/E2E | Real UI sem teste automatizado DOM | Implementado. |
| Historico e estatisticas | `js/world-challenge-storage.js:8-14`, `:107-205`, `:434-492` | `tests/world-challenge-storage.test.js` | Real JS com fake storage | Implementado localmente. |
| Carteira, recompensas e continuacao | `js/world-challenge-wallet.js:8-13`, `:228-363`; `js/app.js:1793-1831` | `tests/world-challenge-wallet.test.js`; `tests/world-challenge.test.js:259-299` | Real JS com fake storage | Implementado localmente; manipulavel pelo cliente. |
| `rankingEligible` | `js/world-challenge.js:627`, `js/app.js:1418-1420`, `js/play-games-competitive.js:208-209` | `tests/world-challenge.test.js:285-286`, `tests/play-games-competitive.test.js:163-172` | Real JS; envio nativo depende Android | Implementado como flag local/adapter. |

## Preservacao do modo antigo

- O perfil separa `modes.expert` e `modes.world_challenge` em `js/profile.js:167-168`; `recordGame` diferencia o modo novo em `js/profile.js:301`.
- O teste `testProfileKeepsLegacyExpert` em `tests/world-challenge-storage.test.js:179-238` comprova, com storage falso, que `expert.gamesPlayed` antigo nao e apagado ao registrar `world_challenge`.
- A UI do antigo modo digitado foi substituida pela experiencia visual do Desafio Mundial em `game/index.html:117-126` e `game/index.html:237-438`. A recuperacao da implementacao visual digitada anterior depende do historico Git.
- A nomenclatura real preservada no codigo e `expert`; nao ha chave literal `expert_legacy` como modo de armazenamento novo.

## Auditoria Google Play Games e Capacitor

| Feature | Classificacao | Evidencia | Observacao |
| --- | --- | --- | --- |
| Plugin Capacitor local | REAL_NATIVE_IMPLEMENTATION parcial | `plugins/capacitor-play-games/android/src/main/java/app/flaggame/playgames/FlagGamePlayGamesPlugin.java:28`; `@CapacitorPlugin(name = FlagGamePlayGames)` | Codigo nativo existe, mas nao ha app Android neste checkout para registrar/sincronizar/testar. |
| Dependencia GPGS v2 | REAL_NATIVE_IMPLEMENTATION parcial | `plugins/capacitor-play-games/android/build.gradle` usa `implementation 'com.google.android.gms:play-services-games-v2:21.0.0'` | Versao exata, sem `+`; nao foi buildada por falta de projeto Android. |
| Auth/status/player summary | REAL_NATIVE_IMPLEMENTATION parcial + JS_ADAPTER_ONLY | Nativo `FlagGamePlayGamesPlugin.java:68-157`; adapter `js/play-games-adapter.js:166-176` | Chamadas existem, mas so funcionam se o plugin estiver integrado em app Android. |
| Saved Games/Snapshots | REAL_NATIVE_IMPLEMENTATION parcial + JS_ADAPTER_ONLY | Nativo `FlagGamePlayGamesPlugin.java:186-333`; JS `js/cloud-save.js:891-921` | Merge local-first existe em JS; teste nativo real ausente. |
| Leaderboards | REAL_NATIVE_IMPLEMENTATION parcial + JS_ADAPTER_ONLY | Nativo `FlagGamePlayGamesPlugin.java:339-383`, `:452-484`; JS `js/play-games-competitive.js:11-15`, `:336` | IDs XML estao vazios; envio real depende Play Console/app. |
| Achievements | REAL_NATIVE_IMPLEMENTATION parcial + JS_ADAPTER_ONLY | Nativo `FlagGamePlayGamesPlugin.java:397-439`, `:497-529`; JS `js/play-games-competitive.js:16-23`, `:569` | IDs XML vazios; desbloqueio real depende Play Console/app. |
| UI abrir ranking/conquistas | JAVASCRIPT_ADAPTER_ONLY neste checkout | `game/index.html:1058-1070`, `js/app.js:2118-2127` | So chama adapter; fora Android deve ficar oculto por capabilities. |
| Offline queue de ranking | JAVASCRIPT_ADAPTER_ONLY | `js/play-games-competitive.js:45-75`, `:289-302`, `:428-473` | Fila local JS testada; envio nativo real nao testado. |
| Conflitos de cloud save | JAVASCRIPT_ADAPTER_ONLY + TEST_MOCK_ONLY | `js/cloud-save.js:426-685`; `tests/cloud-save.test.js:300-331` | Merge deterministico JS existe; conflito real de SnapshotsClient nao foi exercitado. |
| Web/extensoes fallback | JAVASCRIPT_ADAPTER_ONLY | `js/play-games-adapter.js:46-73`, `:202`; `tests/play-games-adapter.test.js:24-67` | Implementado para nao lançar erro quando nativo indisponivel. |
| Documentos GPG/Saved Games | DOCUMENTATION_ONLY quando fala de app Android pronto | `docs/world-challenge/GOOGLE_PLAY_GAMES_ANDROID.md`, `CLOUD_SAVE.md`, `PLAY_GAMES_CHECKLIST.md` | Alguns trechos dizem “implementa” Saved Games/leaderboards; wording correto seria “plugin local e adapters preparados, pendente integracao no app Android real”. |

### Integracao Capacitor/Android

- `rg --files` encontrou apenas `plugins/capacitor-play-games/android/...`; nao encontrou `android/`, `capacitor.config.*`, `package.json`, `gradlew`, `settings.gradle`, `AndroidManifest.xml` de app ou `MainActivity` na raiz.
- Nao e possivel executar `npx cap sync android` neste checkout porque nao ha projeto Capacitor raiz nem `package.json`.
- Nao e possivel confirmar que o APK Android usado pelo usuario pertence a este repositorio. Faltam `applicationId`, package name de app, SHA-1 e recursos Play Console reais.
- `plugins/capacitor-play-games/android/src/main/res/values/play_games_ids.xml` contem todas as strings de leaderboard/achievement, mas vazias.

## Auditoria dos testes

| Arquivo | Tipo | O que testa | Mock/fake | Risco de falso positivo |
| --- | --- | --- | --- | --- |
| `tests/world-challenge.test.js` | Unitario JS | criacao, acerto, erro, pulo, retry, zero vidas, conclusao, duplicidade, continuacao | Sem DOM/nativo; lista de paises de teste | Medio: motor real, mas conclusao usa subconjunto e nao valida UI/195 reais. |
| `tests/world-challenge-storage.test.js` | Unitario/integracao JS storage | primeiro acesso, vazio, JSON corrompido, interrupcao, duplicidade, limite historico, conclusao, migracao, preservacao expert | Storage fake em memoria | Medio: nao cobre localStorage real de browsers/extensoes. |
| `tests/world-challenge-wallet.test.js` | Unitario JS | recompensa duplicada, saldo insuficiente, continuacao dupla, falha de escrita, restauracao | Storage fake | Medio: valida regra local, nao seguranca contra manipulacao cliente. |
| `tests/platform-capabilities.test.js` | Unitario JS | site, Chrome, Edge, Firefox, Android sem/com plugin, URL Play Store | Objetos `window` falsos | Medio/alto: nao abre navegadores reais nem extensoes. |
| `tests/play-games-adapter.test.js` | Unitario JS adapter | fallback web, Android sem plugin, sucesso/falha de plugin | Capacitor/native plugin falso | Alto para Android: nao executa Java/Kotlin nem Play Services. |
| `tests/cloud-save.test.js` | Unitario/integracao JS | merge snapshot, preferencias recentes, falha cloud preserva local, conflito com commit | `FlagGamePlayGames` fake | Alto para Saved Games: nao testa SnapshotsClient real. |
| `tests/play-games-competitive.test.js` | Unitario JS | envio elegivel uma vez, inelegivel, fila de falha, conquistas locais idempotentes | Play Games fake | Alto para GPGS: nao testa LeaderboardsClient/AchievementsClient reais. |

Nenhum teste Android instrumentado, Gradle, Espresso, Robolectric, Play Games real, extensao real ou E2E de browser foi encontrado nesta auditoria. Nenhum teste foi executado nesta tarefa, por escopo de auditoria sem builds/alteracoes.

## Auditoria de documentacao

- `docs/world-challenge/GOOGLE_PLAY_GAMES_ANDROID.md:3` afirma que a fase implementa Saved Games, conquistas oficiais e leaderboards. Como frase de produto, isso e impreciso neste checkout; a implementacao comprovavel e “plugin local + adapters JS preparados; app Android real ausente”.
- `docs/world-challenge/CLOUD_SAVE.md:3-10` descreve salvamento em nuvem Android como fluxo implementado. Deve ser lido como implementacao JS + plugin pendente de integracao e teste em app Android.
- `docs/world-challenge/PLATFORM_MATRIX.md:98-117` registra corretamente que nao ha projeto Android/Capacitor no workspace.
- `docs/world-challenge/PLAY_GAMES_CHECKLIST.md` esta coerente como checklist de Play Console e deixa claro que IDs precisam ser copiados para XML.
- `docs/world-challenge/ENGINE.md:54` ficou defasado em relacao as fases seguintes, pois ainda diz que moedas/GPG/ranking/Saved Games nao sao atualizados por este modo.
- Sugestao de wording, sem editar os docs nesta tarefa: “Neste checkout, Google Play Games esta preparado em adapter JS e plugin Capacitor local; a disponibilidade real depende de integrar o plugin ao projeto Android, preencher IDs da Play Console e validar em dispositivo autenticado.”

## Riscos

| Severidade | Risco | Evidencia | Impacto |
| --- | --- | --- | --- |
| Critico | Nao ha projeto Android de app neste checkout | So existe `plugins/capacitor-play-games/...`; ausencia de `android/` e `capacitor.config.*` | Nao ha como provar GPGS real, Saved Games, placares, conquistas ou build Android neste repo. |
| Alto | Documentacao pode soar como recurso Android finalizado | `GOOGLE_PLAY_GAMES_ANDROID.md:3`, `CLOUD_SAVE.md` | Pode induzir conclusao falsa de que app Android ja sincroniza/rankeia. |
| Alto | `dist/` e ZIPs gerados estao untracked em grande volume | 1024 untracked, maioria `dist/` | Risco de commitar artefatos defasados; `git diff --stat` nao mostra esse volume. |
| Alto | Testes Play Games sao mocks JS | `tests/play-games-adapter.test.js`, `tests/cloud-save.test.js`, `tests/play-games-competitive.test.js` | Passar testes nao comprova Android nativo. |
| Medio | Moedas locais sao manipulaveis | `js/world-challenge-wallet.js` localStorage/storage | Aceitavel para moeda gratuita local, mas nunca deve validar competicao. |
| Medio | Restauracao de partida em andamento nao comprovada | Sem `visibilitychange`/`pagehide` para snapshot completo; apenas `registrarInterrupcaoWorldChallenge` em navegacao/saida | Encerramento de processo pode virar partida interrompida, nao restauracao jogavel. |
| Medio | Traducoes incompletas apesar de chaves presentes | Varias locales mostram Play Games/cloud em ingles | UX inconsistente em idiomas nao EN/PT/ES/FR parcialmente. |
| Medio | Recursos XML Play Games vazios | `play_games_ids.xml` strings vazias | Chamadas reais retornam erro de recurso ausente ate configurar Play Console. |
| Baixo | Firebase existe como adapter legado opcional | `js/firebase-auth.js` e docs existentes | Nao e Supabase/Billing/compra; mas pode confundir a leitura do escopo. |
| Baixo | Extensoes carregam scripts Android-adapter JS | `game/index.html:1258-1266` | Adapter nega por capacidade; risco baixo se CSP nao carrega codigo externo. |

## Funcionalidades comprovadamente implementadas

1. Motor JS `world_challenge` com 195 como total configurado, 5 vidas, 4 alternativas, fila de retry, distancia minima relaxavel, bloqueio de duplicidade, erro/pulo perdendo vida, acerto mantendo vida, fim por zero vidas e conclusao por todos os paises corretos.
2. Interface Web/extension do Desafio Mundial no antigo espaco do modo experiente, com vidas, progresso X/195, timer, alternativas, “Nao sei”, feedback, continuacao e resultado.
3. Persistencia local JS versionada de estatisticas/historico do Desafio Mundial, separada de `expert`.
4. Carteira local JS versionada, recompensas por marco, historico de transacoes e uma continuacao por `runId`.
5. Camada de capacidades JS para Web/extensoes/Android com Play Games negado por padrao fora de Android/plugin.
6. Plugin Capacitor local com codigo nativo Java para PlayGamesSdk, auth, player summary, Saved Games, placares e conquistas, ainda isolado do app Android real.

## Funcionalidades apenas simuladas

1. Testes de Google Play Games, Saved Games, placares e conquistas: todos usam mocks/fakes JS.
2. Cloud save em ambiente desta auditoria: fluxo JS e plugin local existem, mas sem app Android integrado e sem SnapshotsClient real executado.
3. Submissao de ranking/conquistas oficiais: fila e criterios JS existem; submissao real depende de Android/plugin/IDs/autenticacao.
4. Detecao Android com plugin em testes: simulada por objetos `window`/Capacitor falsos.

## Funcionalidades ainda ausentes

1. Projeto Android de app dentro deste checkout.
2. `capacitor.config.*`, `package.json`, Gradle wrapper, `settings.gradle`, `MainActivity`, `applicationId` e manifest de app.
3. Registro/sync real do plugin com `npx cap sync android`.
4. IDs reais de Play Console para leaderboards/achievements e app id GPGS.
5. Testes em dispositivo Android com/sem internet, com/sem autenticacao e apos reinstalacao.
6. Testes E2E reais de browser/extensoes e verificacao visual 320 px/tablet/desktop nesta auditoria.
7. Restauracao jogavel completa de partida em andamento apos encerramento de processo, nao comprovada pelo codigo auditado.

## Arquivos que nao deveriam ser commitados

1. `dist/chrome/**`, `dist/edge/**`, `dist/firefox/**`: saidas geradas de distribuicao.
2. `dist/packages/flag-game-*.zip`: pacotes gerados de extensao.
3. Qualquer futuro build Android (`android/app/build/**`, APK/AAB), se aparecer em outro checkout, salvo politica explicita de versionamento.

## Proximos passos obrigatorios

1. Decidir politica de versionamento para `dist/` e ZIPs antes de commit.
2. Integrar `plugins/capacitor-play-games` ao projeto Android/Capacitor real.
3. Preencher recursos Play Console reais sem inventar IDs.
4. Rodar build Android e testes em dispositivo no projeto Android correto.
5. Ajustar wording dos docs para deixar claro “preparado/local plugin” vs “recurso Android validado”.
6. Completar traducoes que ficaram em ingles nos arquivos de locale.
7. Criar testes E2E/manual checklist para DOM, responsividade, extensoes e ciclo de vida.

## Comandos necessarios para testar no projeto Android correto

Executar apenas no checkout Android/Capacitor real, nao neste workspace atual:

~~~text
npm install
npx cap sync android
cd android
.\gradlew signingReport
.\gradlew assembleDebug
.\gradlew connectedDebugAndroidTest
adb logcat | findstr FlagGamePlayGames
~~~

Tambem e necessario testar manualmente Play Games autenticado, conta de teste, Saved Games habilitado, leaderboards/achievements publicados, offline queue e reinstalacao.

## Comandos executados nesta auditoria

- Executados e embutidos integralmente acima: `git status --short`, `git diff --name-status`, `git diff --stat`, `git ls-files --others --exclude-standard`.
- Executadas consultas de leitura com `rg`, `Get-Content`, `Select-String`, `git ls-files` e contagens `Measure-Object`.
- Nao foram executados builds, instalacoes, formatadores, comandos destrutivos nem testes automatizados nesta tarefa.

## git status --short final

~~~text
 M css/style.css
 M index.html
 M js/app.js
 M js/background.js
 M js/i18n.js
 M locales/ar.json
 M locales/bn.json
 M locales/de.json
 M locales/en.json
 M locales/es.json
 M locales/fr.json
 M locales/hi.json
 M locales/id.json
 M locales/it.json
 M locales/ja.json
 M locales/ko.json
 M locales/nl.json
 M locales/pl.json
 M locales/pt-BR.json
 M locales/ru.json
 M locales/th.json
 M locales/tr.json
 M locales/uk.json
 M locales/vi.json
 M locales/zh-CN.json
 M manifest.json
?? Flaggame.zip
?? assets/images/
?? assets/pix-qrcode.png
?? dist/
?? "divulga\303\247\303\243o/"
?? docs/
?? game/
?? homepage/
?? js/challenges.js
?? js/cloud-save.js
?? js/firebase-auth.js
?? js/locales-data.js
?? js/platform-capabilities.js
?? js/play-games-adapter.js
?? js/play-games-competitive.js
?? js/profile.js
?? js/ranking.js
?? js/storage.js
?? js/sync.js
?? js/world-challenge-storage.js
?? js/world-challenge-wallet.js
?? js/world-challenge.js
?? manifests/
?? plugins/
?? robots.txt
?? scripts/
?? tests/
~~~

## git diff --stat final

~~~text
 css/style.css      | 2735 +++++++++++++++++++++++++++++++++++++++++++++++-----
 index.html         | 1020 ++++++++++----------
 js/app.js          | 2377 ++++++++++++++++++++++++++++++++++++++++-----
 js/background.js   |   16 +-
 js/i18n.js         |  501 +++++++++-
 locales/ar.json    |  181 +++-
 locales/bn.json    |  181 +++-
 locales/de.json    |  181 +++-
 locales/en.json    |  181 +++-
 locales/es.json    |  181 +++-
 locales/fr.json    |  181 +++-
 locales/hi.json    |  181 +++-
 locales/id.json    |  181 +++-
 locales/it.json    |  181 +++-
 locales/ja.json    |  181 +++-
 locales/ko.json    |  181 +++-
 locales/nl.json    |  181 +++-
 locales/pl.json    |  181 +++-
 locales/pt-BR.json |  181 +++-
 locales/ru.json    |  181 +++-
 locales/th.json    |  181 +++-
 locales/tr.json    |  181 +++-
 locales/uk.json    |  181 +++-
 locales/vi.json    |  181 +++-
 locales/zh-CN.json |  181 +++-
 manifest.json      |   28 +-
 26 files changed, 9230 insertions(+), 1067 deletions(-)
~~~
