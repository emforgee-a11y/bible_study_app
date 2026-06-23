// Views tracking
        const views = {
            BOOKS: 'books',
            CHAPTERS: 'chapters',
            READER: 'reader'
        };
        
        // --- Dynamic UI Translation Dictionary ---
        const UI_LANGS = {
            'en': {
                sidebar_title: 'Bible Study Options',
                live_voice: 'Live Voice Chat',
                reading_mode: 'Reading Mode',
                parallel: 'Parallel',
                single_focus: 'Single Focus',
                translation_filters: 'Translation Filters',
                show_all: 'Show All',
                hide_all: 'Hide All',
                select_focus: 'Select Focus Version',
                text_color: 'Text Color',
                customize_color: 'Customize reading color',
                layout_style: 'Layout Style',
                verse_list: 'Verse List',
                paragraphs: 'Paragraphs',
                text_size: 'Text Size',
                theme_colors: 'Custom Theme Colors',
                bg: 'Background',
                surface: 'Surface Cards',
                main_text: 'Main Text',
                app_accent: 'App Accent (Buttons/Headers)',
                reset_theme: 'Reset Theme Colors',
                bible_index: 'Bible Index',
                search_placeholder: 'Search verse (e.g. Rom 1:16)...',
                search_title: 'Search Reference',
                back: 'Back',
                ot: 'Old Testament',
                nt: 'New Testament',
                select_book: 'Select a Book to Study',
                select_chapter: 'Select Chapter',
                back_index: '← Back to Index',
                loading_chapter: 'Loading Chapter Text...',
                prev_chapter: '← Previous Chapter',
                chapters_list: 'Chapters list',
                next_chapter: 'Next Chapter →',
                tab_commentary: 'Commentary',
                tab_chat: 'AI Study Agent',
                chat_info: 'Configure your Google Gemini API key to ask questions about this verse and commentaries.',
                save_key: 'Save Key',
                chat_help: 'Get a free API key here ↗',
                chat_welcome: 'Hello! Ask me anything about the active verse or its commentaries. I\'ve automatically loaded their text as context.',
                chat_placeholder: 'Ask a question about this verse...',
                clear_chat: 'Clear Chat',
                change_key: 'Change API Key',
                no_commentary: 'No commentary available for',
                currently_viewing: 'Currently viewing only',
                show_parallel: 'Show Parallel Versions',
                tts_controls: 'Text to Speech',
                tts_read: 'Read',
                tts_pause: 'Pause',
                tts_resume: 'Resume',
                tts_voice: 'Voice',
                tts_speed: 'Speed',
                theme_toggle: 'Toggle Light/Dark Theme',
                timeline_btn: 'Timeline',
                quiz_btn: 'Quiz',
                help_btn: 'Help',
                random_verse_btn: 'Random'
            },
            'es': {
                sidebar_title: 'Opciones de Estudio Bíblico',
                reading_mode: 'Modo de Lectura',
                parallel: 'Paralelo',
                single_focus: 'Enfoque Único',
                translation_filters: 'Filtros de Traducción',
                show_all: 'Mostrar Todo',
                hide_all: 'Ocultar Todo',
                select_focus: 'Seleccionar Versión de Enfoque',
                text_color: 'Color del Texto',
                customize_color: 'Personalizar color de lectura',
                layout_style: 'Estilo de Diseño',
                verse_list: 'Lista de Versículos',
                paragraphs: 'Párrafos',
                text_size: 'Tamaño de Texto',
                theme_colors: 'Colores de Tema Personalizados',
                bg: 'Fondo',
                surface: 'Tarjetas de Superficie',
                main_text: 'Texto Principal',
                app_accent: 'Acento de la App (Botones/Títulos)',
                reset_theme: 'Restablecer Colores de Tema',
                bible_index: 'Índice de la Biblia',
                search_placeholder: 'Buscar versículo (ej. Rom 1:16)...',
                search_title: 'Buscar Referencia',
                back: 'Atrás',
                ot: 'Antiguo Testamento',
                nt: 'Nuevo Testamento',
                select_book: 'Seleccione un Libro para Estudiar',
                select_chapter: 'Seleccionar Capítulo',
                back_index: '← Volver al Índice',
                loading_chapter: 'Cargando Texto del Capítulo...',
                prev_chapter: '← Capítulo Anterior',
                chapters_list: 'Lista de Capítulos',
                next_chapter: 'Siguiente Capítulo →',
                tab_commentary: 'Comentario',
                tab_chat: 'Agente de Estudio de IA',
                chat_info: 'Configure su clave API de Google Gemini para hacer preguntas sobre este versículo y sus comentarios.',
                save_key: 'Guardar Clave',
                chat_help: 'Obtenga una clave API gratuita aquí ↗',
                chat_welcome: '¡Hola! Pregúntame lo que quieras sobre el versículo activo o sus comentarios. He cargado automáticamente su texto como contexto.',
                chat_placeholder: 'Hacer una pregunta sobre este versículo...',
                clear_chat: 'Limpiar Chat',
                change_key: 'Cambiar Clave API',
                no_commentary: 'No hay comentarios disponibles para',
                currently_viewing: 'Actualmente viendo solo',
                show_parallel: 'Mostrar Versiones en Paralelo',
                tts_controls: 'Texto a Voz (TTS)',
                tts_read: 'Leer',
                tts_pause: 'Pausar',
                tts_resume: 'Reanudar',
                tts_voice: 'Voz',
                tts_speed: 'Velocidad',
                theme_toggle: 'Alternar Tema Claro/Oscuro',
                timeline_btn: 'Línea de Tiempo',
                quiz_btn: 'Quiz',
                help_btn: 'Ayuda',
                random_verse_btn: 'Aleatorio'
            }
        };

        let currentLanguage = 'en';

        function initLanguage() {
            const savedLang = localStorage.getItem('app-lang');
            if (savedLang === 'es' || savedLang === 'en') {
                currentLanguage = savedLang;
            } else {
                const navLang = navigator.language || navigator.userLanguage;
                if (navLang && navLang.startsWith('es')) {
                    currentLanguage = 'es';
                }
            }
            updateLangUI();
            applyUILanguage();
        }

        function setLanguage(lang) {
            currentLanguage = lang;
            localStorage.setItem('app-lang', lang);
            updateLangUI();
            applyUILanguage();
            
            // Re-render the active view immediately
            if (currentView === views.BOOKS) {
                renderBooksGrid();
            } else if (currentView === views.CHAPTERS) {
                renderChaptersGrid();
            } else if (currentView === views.READER) {
                renderChapterContent(selectedBook.id, selectedChapter, activeChapterVerses);
            }
            
            // Re-render version list to update details.desc translations
            renderTranslationList();
        }

        function updateLangUI() {
            const btnEn = document.getElementById('lang-btn-en');
            const btnEs = document.getElementById('lang-btn-es');
            const sEn = document.getElementById('sidebar-lang-btn-en');
            const sEs = document.getElementById('sidebar-lang-btn-es');
            
            if (currentLanguage === 'en') {
                if (btnEn) {
                    btnEn.style.backgroundColor = 'var(--color-accent)';
                    btnEn.style.color = 'var(--bg-base)';
                    btnEn.classList.add('active');
                }
                if (btnEs) {
                    btnEs.style.backgroundColor = 'transparent';
                    btnEs.style.color = 'var(--text-secondary)';
                    btnEs.classList.remove('active');
                }
                if (sEn) sEn.classList.add('active');
                if (sEs) sEs.classList.remove('active');
            } else {
                if (btnEs) {
                    btnEs.style.backgroundColor = 'var(--color-accent)';
                    btnEs.style.color = 'var(--bg-base)';
                    btnEs.classList.add('active');
                }
                if (btnEn) {
                    btnEn.style.backgroundColor = 'transparent';
                    btnEn.style.color = 'var(--text-secondary)';
                    btnEn.classList.remove('active');
                }
                if (sEs) sEs.classList.add('active');
                if (sEn) sEn.classList.remove('active');
            }
        }

        // --- Text to Speech (TTS) Implementation ---
        let isSpeaking = false;
        let ttsVoices = [];
        let ttsQueue = [];
        let ttsIndex = 0;
        let currentUtterance = null;
        let userSelectedVoiceName = null;

        function handleVoiceChange(value) {
            userSelectedVoiceName = value;
        }

        function populateVoices() {
            if (typeof speechSynthesis === 'undefined') return;
            
            ttsVoices = speechSynthesis.getVoices();
            const select = document.getElementById('tts-voice-select');
            if (!select) return;
            
            select.innerHTML = '';
            
            const isEs = (singleFocusVersion !== 'KJV');
            const langPrefix = isEs ? 'es' : 'en';
            
            const matchedVoices = ttsVoices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
            const otherVoices = ttsVoices.filter(v => !v.lang.toLowerCase().startsWith(langPrefix));
            const voicesToShow = [...matchedVoices, ...otherVoices];
            
            voicesToShow.forEach(voice => {
                const option = document.createElement('option');
                option.value = voice.name;
                const isMatch = voice.lang.toLowerCase().startsWith(langPrefix);
                option.innerText = `${voice.name} (${voice.lang})${isMatch ? ' *' : ''}`;
                select.appendChild(option);
            });
            
            // Smart auto-selection:
            // If the user has a manually selected voice AND it matches the current language prefix, use it.
            // Otherwise, auto-select the first matching voice for the current language.
            let selectedVoice = null;
            if (userSelectedVoiceName) {
                selectedVoice = ttsVoices.find(v => v.name === userSelectedVoiceName);
            }
            
            if (selectedVoice && selectedVoice.lang.toLowerCase().startsWith(langPrefix)) {
                select.value = selectedVoice.name;
            } else if (matchedVoices.length > 0) {
                select.value = matchedVoices[0].name;
            }
        }

        // Trigger loading voices
        if (typeof speechSynthesis !== 'undefined') {
            speechSynthesis.onvoiceschanged = populateVoices;
            // Immediate invoke for browsers that populate synchronous
            setTimeout(populateVoices, 100);
        }

        function stopTTS() {
            if (typeof speechSynthesis === 'undefined') return;
            speechSynthesis.cancel();
            isSpeaking = false;
            ttsQueue = [];
            ttsIndex = 0;
            updateTTSButtons();
            clearTTSHighlights();
        }

        function updateTTSButtons() {
            const playIcon = document.getElementById('tts-play-icon');
            const playText = document.getElementById('tts-play-text');
            const stopBtn = document.getElementById('tts-stop-btn');
            if (!playIcon || !playText || !stopBtn) return;
            
            if (isSpeaking) {
                if (speechSynthesis.paused) {
                    playIcon.innerText = '▶';
                    playText.setAttribute('data-translate', 'tts_resume');
                    playText.innerText = UI_LANGS[currentLanguage].tts_resume || 'Resume';
                } else {
                    playIcon.innerText = '⏸';
                    playText.setAttribute('data-translate', 'tts_pause');
                    playText.innerText = UI_LANGS[currentLanguage].tts_pause || 'Pause';
                }
                stopBtn.removeAttribute('disabled');
            } else {
                playIcon.innerText = '▶';
                playText.setAttribute('data-translate', 'tts_read');
                playText.innerText = UI_LANGS[currentLanguage].tts_read || 'Read';
                stopBtn.setAttribute('disabled', 'true');
            }
        }

        function toggleTTS() {
            if (typeof speechSynthesis === 'undefined') {
                alert("Text-to-speech is not supported in this browser.");
                return;
            }
            // Smart voice refresh based on active version language prefix
            populateVoices();
            
            if (isSpeaking) {
                if (speechSynthesis.paused) {
                    speechSynthesis.resume();
                } else {
                    speechSynthesis.pause();
                }
                updateTTSButtons();
                return;
            }
            
            if (!activeChapterVerses) return;
            
            speechSynthesis.cancel();
            isSpeaking = true;
            ttsQueue = [];
            ttsIndex = 0;
            
            // 1. Queue Chapter Heading
            const bookName = currentLanguage === 'es' ? selectedBook.name_es : selectedBook.name_en;
            const chLabel = currentLanguage === 'es' ? `Capítulo ${selectedChapter}` : `Chapter ${selectedChapter}`;
            ttsQueue.push({
                text: `${bookName}, ${chLabel}`,
                verseNum: 0
            });
            
            // 2. Queue Verses without verse numbers or paragraph markers
            activeChapterVerses.forEach((verse, idx) => {
                const verseNum = idx + 1;
                const rawText = verse[singleFocusVersion] || "";
                if (!rawText) return;
                
                // Clean markdown markup (*was* -> was) and speech indicators
                let cleanText = rawText.replace(/¶/g, '');
                cleanText = cleanText.replace(/\*/g, '');
                cleanText = cleanText.replace(/[‹›]/g, '');
                
                ttsQueue.push({
                    text: cleanText,
                    verseNum: verseNum
                });
            });
            
            updateTTSButtons();
            speakNextInQueue();
        }

        function speakNextInQueue() {
            if (ttsIndex >= ttsQueue.length || !isSpeaking) {
                stopTTS();
                return;
            }
            
            const item = ttsQueue[ttsIndex];
            const utterance = new SpeechSynthesisUtterance(item.text);
            currentUtterance = utterance;
            
            const select = document.getElementById('tts-voice-select');
            if (select && select.value) {
                const voice = ttsVoices.find(v => v.name === select.value);
                if (voice) utterance.voice = voice;
            }
            
            const rateVal = parseFloat(document.getElementById('tts-rate-range').value);
            utterance.rate = rateVal;
            
            utterance.onstart = function() {
                highlightVerseForTTS(item.verseNum);
            };
            
            utterance.onend = function() {
                ttsIndex++;
                speakNextInQueue();
            };
            
            utterance.onerror = function(e) {
                console.error("TTS error:", e);
                ttsIndex++;
                speakNextInQueue();
            };
            
            speechSynthesis.speak(utterance);
        }

        function highlightVerseForTTS(verseNum) {
            clearTTSHighlights();
            if (verseNum === 0) {
                const title = document.querySelector('.chapter-title-container');
                if (title) title.classList.add('tts-active');
                return;
            }
            
            const element = document.getElementById(`v-${verseNum}`);
            if (element) {
                element.classList.add('tts-active');
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        function clearTTSHighlights() {
            document.querySelectorAll('.tts-active').forEach(el => {
                el.classList.remove('tts-active');
            });
        }

        function updateTTSRate(val) {
            document.getElementById('tts-rate-label').innerText = `${parseFloat(val).toFixed(1)}x`;
        }

        // Force voices reload when version is changed (to automatically pre-select language matching voice)
        const originalSetSingleVersion = setSingleVersion;
        setSingleVersion = function(version) {
            originalSetSingleVersion(version);
            populateVoices();
        };

        const originalFocusSingleVersion = focusSingleVersion;
        focusSingleVersion = function(version) {
            originalFocusSingleVersion(version);
            populateVoices();
        };

        // --- Drag and Drop Version Reordering Handlers ---
        let draggedVersion = null;

        function handleDragStart(e) {
            draggedVersion = e.currentTarget.getAttribute('data-version');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', draggedVersion);
            e.currentTarget.classList.add('dragging');
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            
            if (e.clientY < midpoint) {
                target.style.borderTop = '2px solid var(--color-accent)';
                target.style.borderBottom = '';
            } else {
                target.style.borderBottom = '2px solid var(--color-accent)';
                target.style.borderTop = '';
            }
            return false;
        }

        function handleDragLeave(e) {
            e.currentTarget.style.borderTop = '';
            e.currentTarget.style.borderBottom = '';
        }

        function handleDrop(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            
            const targetVersion = e.currentTarget.getAttribute('data-version');
            if (draggedVersion === targetVersion) return;
            
            const fromIndex = versionOrder.indexOf(draggedVersion);
            const toIndex = versionOrder.indexOf(targetVersion);
            
            if (fromIndex !== -1 && toIndex !== -1) {
                const rect = e.currentTarget.getBoundingClientRect();
                const midpoint = rect.top + rect.height / 2;
                let insertIndex = toIndex;
                
                versionOrder.splice(fromIndex, 1);
                
                if (e.clientY > midpoint && fromIndex > toIndex) {
                    insertIndex = toIndex + 1;
                } else if (e.clientY < midpoint && fromIndex < toIndex) {
                    insertIndex = toIndex - 1;
                }
                
                if (insertIndex < 0) insertIndex = 0;
                
                versionOrder.splice(insertIndex, 0, draggedVersion);
                
                localStorage.setItem('version_order', JSON.stringify(versionOrder));
                renderTranslationList();
                
                if (activeChapterVerses && currentView === views.READER) {
                    renderChapterContent(selectedBook.id, selectedChapter, activeChapterVerses);
                }
            }
            return false;
        }

        function handleDragEnd(e) {
            e.currentTarget.classList.remove('dragging');
            document.querySelectorAll('.version-toggle-card').forEach(card => {
                card.style.borderTop = '';
                card.style.borderBottom = '';
            });
        }

        function applyUILanguage() {
            const strings = UI_LANGS[currentLanguage];
            
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if (strings[key]) {
                    if (el.tagName === 'INPUT' && el.type === 'text') {
                        el.placeholder = strings[key];
                    } else if (el.tagName === 'TEXTAREA') {
                        el.placeholder = strings[key];
                    } else {
                        el.innerHTML = strings[key];
                    }
                }
            });
            
            const searchInput = document.getElementById('global-search-input');
            if (searchInput) {
                searchInput.placeholder = strings.search_placeholder;
            }
            const searchBtn = searchInput ? searchInput.nextElementSibling : null;
            if (searchBtn) {
                searchBtn.title = strings.search_title;
            }
            
            const themeBtn = document.getElementById('theme-toggle-btn');
            if (themeBtn) {
                themeBtn.title = strings.theme_toggle;
            }
        }

        function applyLanguage() {
            updateLangUI();
            applyUILanguage();
        }

        let currentView = views.BOOKS;
        let selectedBook = null;       // Metadata object of active book
        let selectedChapter = null;    // Active chapter index (1-based)
        let loadedScript = null;       // Active injected script tag element

        // Reading and Layout mode states
        let currentReadingMode = 'parallel'; // 'parallel' or 'single'
        let singleFocusVersion = 'KJV';      // Default focused version
        let currentLayoutMode = 'verse';     // 'verse' or 'paragraphs' (prose)
        let activeChapterVerses = null;      // Cached array of verses for instantaneous re-rendering
        let currentFontScale = 1.0;          // Font scaling factor

        // Bible loader interface used by the dynamically loaded chapter scripts
        window.bible_loader = {
            load_chapter: function(bookId, chNum, versesData) {
                // Map Spav1602 keys and paragraph flags to VG dynamically
                versesData.forEach(verse => {
                    if (verse.hasOwnProperty('Spav1602')) {
                        verse['VG'] = verse['Spav1602'];
                    }
                    if (verse.p) {
                        const index = verse.p.indexOf('Spav1602');
                        if (index !== -1) {
                            verse.p[index] = 'VG';
                        }
                    }
                });
                activeChapterVerses = versesData;
                renderChapterContent(bookId, chNum, versesData);
            }
        };

        // Initialize App
        window.onload = function() {
            initLanguage();
            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
            } else if (savedTheme === 'dim') {
                document.body.classList.add('dim-theme');
            }
            
            // Setup main-panel click listener to close sidebar on mobile
            document.querySelector('.main-panel').addEventListener('click', function() {
                const sidebar = document.getElementById('sidebar');
                if (sidebar.classList.contains('active')) {
                    toggleSidebar();
                }
            });

            initVersionSettings();
            renderTranslationList();
            loadCustomColors(); // Load and apply custom color configurations
            renderBooksGrid();
            updateFilters();
        };

        // Render Book Selection Grid
        function renderBooksGrid() {
            currentView = views.BOOKS;
            document.getElementById('header-back-btn').style.display = 'none';
            document.getElementById('floating-actions').style.display = 'none';
            
            const breadcrumbs = document.getElementById('breadcrumbs');
            breadcrumbs.innerHTML = `<span class="active-book" onclick="showView('books')" data-translate="bible_index">Bible Index</span>`;
            
            const pane = document.getElementById('display-pane');
            
            // Separate OT (1-39) and NT (40-66)
            const otBooks = BIBLE_METADATA.filter(b => b.id <= 39);
            const ntBooks = BIBLE_METADATA.filter(b => b.id >= 40);

            let html = `<h2 class="toc-title">Select a Book to Study</h2>`;
            html += `<div class="toc-sections-grid">`;
            
            // OT Card
            html += `<div class="toc-section-card">`;
            html += `<h3>Antiguo Testamento / Old Testament</h3>`;
            html += `<div class="books-grid">`;
            otBooks.forEach(book => {
                html += `
                <button class="book-btn" onclick="selectBook(${book.id})">
                    <span class="book-name-en">${book.name_en}</span>
                    <span class="book-name-es">${book.name_es}</span>
                </button>`;
            });
            html += `</div></div>`;
            
            // NT Card
            html += `<div class="toc-section-card">`;
            html += `<h3>Nuevo Testamento / New Testament</h3>`;
            html += `<div class="books-grid">`;
            ntBooks.forEach(book => {
                html += `
                <button class="book-btn" onclick="selectBook(${book.id})">
                    <span class="book-name-en">${book.name_en}</span>
                    <span class="book-name-es">${book.name_es}</span>
                </button>`;
            });
            html += `</div></div>`;
            
            html += `</div>`;
            pane.innerHTML = html;
            pane.scrollTop = 0;
        }

        // Book selected, show its Chapter selection grid
        function selectBook(bookId) {
            selectedBook = BIBLE_METADATA.find(b => b.id === bookId);
            closeSidebarOnMobile();
            renderChaptersGrid();
        }

        // Render chapter grid for selected book
        function renderChaptersGrid() {
            currentView = views.CHAPTERS;
            document.getElementById('header-back-btn').style.display = 'inline-block';
            document.getElementById('floating-actions').style.display = 'none';
            
            const breadcrumbs = document.getElementById('breadcrumbs');
            breadcrumbs.innerHTML = `
                <span class="active-book" onclick="showView('books')" data-translate="bible_index">Bible Index</span>
                <span class="separator">></span>
                <span class="active-chapter" onclick="showView('chapters')">${selectedBook.name_en} (${selectedBook.name_es})</span>
            `;
            
            const pane = document.getElementById('display-pane');
            
            let html = `
            <div class="chapter-container">
                <div class="chapter-header">
                    <button class="btn-back" onclick="showView('books')">← Back to Index</button>
                    <h2 class="chapter-grid-title">Select Chapter</h2>
                </div>
                <div class="chapters-grid">`;
                
            for (let c = 1; c <= selectedBook.chapters; c++) {
                html += `<button class="chapter-btn" onclick="loadChapter(${c})">${c}</button>`;
            }
            
            html += `</div></div>`;
            pane.innerHTML = html;
            pane.scrollTop = 0;
        }

        // Load specific chapter via dynamic script loading
        function loadChapter(chapterNum, targetVerse = null) {
            stopTTS();
            selectedChapter = chapterNum;
            currentView = views.READER;
            closeSidebarOnMobile();
            
            const pane = document.getElementById('display-pane');
            pane.innerHTML = `<h2 class="toc-title" style="margin-top: 5rem;">Loading Chapter Text...</h2>`;
            
            // Clean up any previously loaded script tags to avoid memory leaks
            if (loadedScript) {
                loadedScript.parentNode.removeChild(loadedScript);
            }
            
            // Inject script to load chapter data
            const script = document.createElement('script');
            script.src = `bible_data/chapter_${selectedBook.id}_${selectedChapter}.js`;
            script.onload = function() {
                // Dynamically fetch and load commentaries for this chapter
                loadCommentaryData(selectedBook.id, selectedChapter, targetVerse);
            };
            script.onerror = function() {
                pane.innerHTML = `
                <div class="chapter-container" style="margin-top: 5rem; text-align: center;">
                    <h2 class="chapter-grid-title" style="color: var(--color-60);">Error Loading Chapter</h2>
                    <p style="margin: 1rem 0; color: var(--text-secondary);">The required data file could not be found or read.</p>
                    <button class="btn btn-primary" onclick="renderChaptersGrid()">Go Back</button>
                </div>`;
            };
            
            document.head.appendChild(script);
            loadedScript = script;
        }

        // Render chapter verses list (called by bible_loader.load_chapter)
                // --- Dynamic formatting for Jesus' words (bold) and supplied text (italics) ---
        function formatVerseText(text, isParagraphView = false) {
            if (!text) return "";
            let formatted = text;
            if (isParagraphView) {
                // Strip pilcrows in paragraph mode so they do not show up inline
                formatted = formatted.replace(/¶/g, '');
            }
            // supplied editorial words *was* -> <em>was</em>  (asterisk format, e.g. VP)
            formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
            // supplied editorial words [was] -> <em>was</em>  (bracket format, e.g. VG, KJV)
            formatted = formatted.replace(/\[([^\]]+)\]/g, '<em>$1</em>');
            // direct speech ‹Blessed› -> <strong>Blessed</strong>
            formatted = formatted.replace(/‹([^›]+)›/g, '<strong>$1</strong>');
            return formatted;
        }

        // Render chapter verses list (called by bible_loader.load_chapter)
        function renderChapterContent(bookId, chNum, versesData) {
            document.getElementById('header-back-btn').style.display = 'inline-block';
            document.getElementById('floating-actions').style.display = 'flex';
            
            const breadcrumbs = document.getElementById('breadcrumbs');
            breadcrumbs.innerHTML = `
                <span class="active-book" onclick="showView('books')" data-translate="bible_index">Bible Index</span>
                <span class="separator">></span>
                <span class="active-book" onclick="showView('chapters')">${selectedBook.name_en}</span>
                <span class="separator">></span>
                <span class="active-chapter">Chapter ${selectedChapter}</span>
            `;
            
            const pane = document.getElementById('display-pane');
            
            let html = `<div class="reader-container"><div class="reader-content">`;
            
            // Chapter Title Header (Genesis - Chapter 1 / Génesis - Capítulo 1)
            html += `
            <div class="chapter-title-container">
                <h1 class="chapter-title">${selectedBook.name_en} - Chapter ${selectedChapter}</h1>
                <div class="chapter-title-es">${selectedBook.name_es} - Capítulo ${selectedChapter}</div>
            </div>`;
            
            html += `
            <div class="single-mode-banner" id="single-mode-banner" style="display: ${currentReadingMode === 'single' ? 'flex' : 'none'};">
                <span>Currently viewing only <strong style="color: var(--color-${singleFocusVersion})">${VERSION_DETAILS[singleFocusVersion].label}</strong>.</span>
                <button class="btn btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="changeReadingMode('parallel')">Show Parallel Versions</button>
            </div>`;
            
            // Determine layout rendering mode (Fluid Paragraphs vs Verse Card list)
            if (currentReadingMode === 'single' && currentLayoutMode === 'paragraphs') {
                let inParagraph = false;
                
                versesData.forEach((verse, idx) => {
                    const verseNum = idx + 1;
                    const text = verse[singleFocusVersion] || "";
                    
                    // Check if a paragraph starts at this verse number for this version.
                    // If no explicit p list, verse 1 is the default start.
                    const startsParagraph = (verse.p && verse.p.includes(singleFocusVersion)) || verseNum === 1;
                    
                    if (startsParagraph) {
                        if (inParagraph) {
                            html += `</p>`;
                        }
                        html += `<p class="bible-paragraph" style="color: var(--color-${singleFocusVersion});">`;
                        inParagraph = true;
                    }
                    
                    if (text) {
                        html += `<span id="v-${verseNum}" class="tts-verse-wrapper" style="transition: all 0.3s ease;"><span class="verse-inline-num clickable-verse-inline" onclick="openCommentary(${selectedBook.id}, ${selectedChapter}, ${verseNum})" title="Click to view commentaries & AI chat">${verseNum}</span>${formatVerseText(text, true)} </span>`;
                    }
                });
                
                if (inParagraph) {
                    html += `</p>`;
                }
            } else {
                // Verse-by-verse card rendering (standard)
                versesData.forEach((verse, idx) => {
                    const verseNum = idx + 1;
                    html += `<div class="verse-card" id="v-${verseNum}">`;
                    html += `<div class="verse-num clickable-verse-num" onclick="openCommentary(${selectedBook.id}, ${selectedChapter}, ${verseNum})" title="Click to view commentaries & AI chat">${selectedBook.name_en} ${selectedChapter}:${verseNum} <span class="comm-indicator">💬</span></div>`;
                    
                    // Render versions dynamically in the user's customized order!
                    versionOrder.forEach(v => {
                        if (verse[v]) {
                            const label = VERSION_DETAILS[v].desc || v;
                            // Strip any embedded ¶ from the raw text before we add our own marker (prevents ¶¶ double-symbol)
                            const rawVerseText = (verse[v] || '').replace(/¶/g, '').trim();
                            const hasPara = verse.p && verse.p.includes(v);
                            const paraMarker = hasPara ? '<span class="para-marker" style="font-weight: bold; margin-right: 0.25rem; opacity: 0.85;">¶</span>' : '';
                            html += `
                            <div class="verse-translation-block vt-${v}">
                                <span class="badge badge-${v}" onclick="focusSingleVersion('${v}')" style="cursor: pointer;" title="Focus only on ${label}">${v}</span>
                                <span class="vt-text">${paraMarker}${formatVerseText(rawVerseText, false)}</span>
                            </div>`;
                        }
                    });
                    
                    html += `</div>`;
                });
            }
            
            // Add navigation footer
            const prevChLabel = UI_LANGS[currentLanguage].prev_chapter;
            const listChLabel = UI_LANGS[currentLanguage].chapters_list;
            const nextChLabel = UI_LANGS[currentLanguage].next_chapter;

            html += `
            <div class="chapter-footer-nav">
                <button class="btn" onclick="navigateChapter(-1)" ${selectedChapter === 1 && selectedBook.id === 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>${prevChLabel}</button>
                <button class="btn btn-primary" onclick="showView('chapters')">${listChLabel}</button>
                <button class="btn" onclick="navigateChapter(1)" ${selectedChapter === selectedBook.chapters && selectedBook.id === 66 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>${nextChLabel}</button>
            </div>`;
            
            html += `</div></div>`;
            pane.innerHTML = html;
            pane.scrollTop = 0;
            updateFilters();
        }

        // Navigate to prev/next chapter
        function navigateChapter(direction) {
            let nextCh = selectedChapter + direction;
            let nextBookId = selectedBook.id;
            
            if (nextCh < 1) {
                // Go to previous book's last chapter
                nextBookId = selectedBook.id - 1;
                if (nextBookId < 1) return; // beginning of bible
                selectedBook = BIBLE_METADATA.find(b => b.id === nextBookId);
                nextCh = selectedBook.chapters;
            } else if (nextCh > selectedBook.chapters) {
                // Go to next book's first chapter
                nextBookId = selectedBook.id + 1;
                if (nextBookId > 66) return; // end of bible
                selectedBook = BIBLE_METADATA.find(b => b.id === nextBookId);
                nextCh = 1;
            }
            
            loadChapter(nextCh);
        }

        // Breadcrumb and Back Button Routing
        function goBackView() {
            stopTTS();
            if (currentView === views.READER) {
                showView(views.CHAPTERS);
            } else if (currentView === views.CHAPTERS) {
                showView(views.BOOKS);
            }
        }

        // Show view utility
        function showView(viewName) {
            stopTTS();
            if (viewName === views.BOOKS) {
                renderBooksGrid();
            } else if (viewName === views.CHAPTERS && selectedBook) {
                renderChaptersGrid();
            }
            closeSidebarOnMobile();
        }

        // Translation Details
        const VERSION_DETAILS = {
            'KJV': { label: 'KJV', desc: 'King James Version' },
            'VP': { label: 'VP', desc: 'Reina Valera 1602 Purificada' },
            'VG': { label: 'VG', desc: 'Reina Valera Gomez' },
            '09': { label: '09', desc: 'Reina Valera 1909' },
            '60': { label: '60', desc: 'Reina Valera 1960' },
            '65': { label: '65', desc: 'Reina Valera 1865' },
            'BO': { label: 'BO', desc: 'Spanish Biblia del Oso 1569' }
        };

        // Saved ordering, default to:
        let versionOrder = ['KJV', 'VP', 'VG', '09', '60', '65', 'BO'];
        let enabledVersions = {
            'KJV': true, 'VP': true, 'VG': true, '09': true, '60': true, '65': true, 'BO': true
        };

        function initVersionSettings() {
            const savedOrder = localStorage.getItem('version_order');
            if (savedOrder) {
                try {
                    versionOrder = JSON.parse(savedOrder);
                    // Force cache reset if old codes exist or VG is missing
                    if (versionOrder.includes('Spav1602') || !versionOrder.includes('VG')) {
                        localStorage.removeItem('version_order');
                        localStorage.removeItem('enabled_versions');
                        versionOrder = ['KJV', 'VP', 'VG', '09', '60', '65', 'BO'];
                        enabledVersions = {
                            'KJV': true, 'VP': true, 'VG': true, '09': true, '60': true, '65': true, 'BO': true
                        };
                    } else {
                        versionOrder = versionOrder.filter(v => VERSION_DETAILS[v]);
                        Object.keys(VERSION_DETAILS).forEach(v => {
                            if (!versionOrder.includes(v)) versionOrder.push(v);
                        });
                    }
                } catch (e) {
                    console.error("Error parsing saved version order", e);
                }
            }
            
            const savedEnabled = localStorage.getItem('enabled_versions');
            if (savedEnabled) {
                try {
                    enabledVersions = JSON.parse(savedEnabled);
                } catch (e) {
                    console.error("Error parsing saved enabled versions", e);
                }
            }
        }

        function renderTranslationList() {
            const container = document.getElementById('translation-list-container');
            if (!container) return;
            
            let html = '';
            versionOrder.forEach((v, index) => {
                const details = VERSION_DETAILS[v];
                const isChecked = enabledVersions[v] !== false;
                const hexColor = getComputedColorHex(v);
                
                html += `
                <div class="version-toggle-card" onclick="toggleCheckbox('toggle-${v}')" style="cursor: pointer;" draggable="true" data-version="${v}" ondragstart="handleDragStart(event)" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)" ondragend="handleDragEnd(event)">
                    <div class="version-info" onclick="event.stopPropagation()">
                        <div class="reorder-buttons">
                            <button class="btn-reorder" onclick="moveVersion('${v}', -1); event.stopPropagation();" title="Move Up" ${index === 0 ? 'disabled style="opacity:0.2; cursor:default;"' : ''}>▲</button>
                            <button class="btn-reorder" onclick="moveVersion('${v}', 1); event.stopPropagation();" title="Move Down" ${index === versionOrder.length - 1 ? 'disabled style="opacity:0.2; cursor:default;"' : ''}>▼</button>
                        </div>
                        <input type="color" id="picker-${v}" class="version-color-picker" value="${hexColor}" onchange="changeVersionColor('${v}', this.value)">
                        <div onclick="toggleCheckbox('toggle-${v}')" style="cursor:pointer; flex-grow:1; display:flex; flex-direction:column; justify-content:center;">
                            <div class="version-label">${details.label}</div>
                            <div class="version-desc">${details.desc}</div>
                        </div>
                    </div>
                    <label class="switch" onclick="event.stopPropagation()">
                        <input type="checkbox" id="toggle-${v}" ${isChecked ? 'checked' : ''} onchange="toggleCheckboxDirect('${v}', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>`;
            });
            
            container.innerHTML = html;
        }

        function moveVersion(v, direction) {
            const index = versionOrder.indexOf(v);
            if (index === -1) return;
            
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= versionOrder.length) return;
            
            const temp = versionOrder[index];
            versionOrder[index] = versionOrder[newIndex];
            versionOrder[newIndex] = temp;
            
            localStorage.setItem('version_order', JSON.stringify(versionOrder));
            renderTranslationList();
            
            if (activeChapterVerses && currentView === views.READER) {
                renderChapterContent(selectedBook.id, selectedChapter, activeChapterVerses);
            }
        }

        function toggleCheckbox(id) {
            const v = id.replace('toggle-', '');
            enabledVersions[v] = !enabledVersions[v];
            localStorage.setItem('enabled_versions', JSON.stringify(enabledVersions));
            
            const cb = document.getElementById(id);
            if (cb) cb.checked = enabledVersions[v];
            
            updateFilters();
        }
        
        function toggleCheckboxDirect(v, checked) {
            enabledVersions[v] = checked;
            localStorage.setItem('enabled_versions', JSON.stringify(enabledVersions));
            updateFilters();
        }

        function updateFilters() {
            const container = document.getElementById('display-pane');
            if (!container) return;
            
            versionOrder.forEach(v => {
                let show = false;
                if (currentReadingMode === 'parallel') {
                    show = (enabledVersions[v] !== false);
                } else {
                    show = (v === singleFocusVersion);
                }
                
                if (show) {
                    container.classList.remove(`hide-${v}`);
                } else {
                    container.classList.add(`hide-${v}`);
                }
            });
        }

        function setAllFilters(status) {
            versionOrder.forEach(v => {
                enabledVersions[v] = status;
            });
            localStorage.setItem('enabled_versions', JSON.stringify(enabledVersions));
            renderTranslationList();
            updateFilters();
        }

        // Change Reading Mode (Parallel vs Single Focus)
        function changeReadingMode(mode) {
            stopTTS();
            currentReadingMode = mode;
            closeSidebarOnMobile();
            
            const btnParallel = document.getElementById('btn-mode-parallel');
            const btnSingle = document.getElementById('btn-mode-single');
            const parallelControls = document.getElementById('parallel-controls');
            const singleControls = document.getElementById('single-controls');
            
            if (mode === 'parallel') {
                btnParallel.classList.add('active');
                btnSingle.classList.remove('active');
                parallelControls.style.display = 'block';
                singleControls.style.display = 'none';
                
                const banner = document.getElementById('single-mode-banner');
                if (banner) banner.style.display = 'none';
            } else {
                btnParallel.classList.remove('active');
                btnSingle.classList.add('active');
                parallelControls.style.display = 'none';
                singleControls.style.display = 'block';
                
                const banner = document.getElementById('single-mode-banner');
                if (banner) {
                    banner.style.display = 'flex';
                    const strong = banner.querySelector('strong');
                    if (strong) {
                        strong.style.color = `var(--color-${singleFocusVersion})`;
                        strong.innerText = VERSION_DETAILS[singleFocusVersion].label;
                    }
                }
            }
            
            // Re-render if cached data is available to update layout immediately
            if (activeChapterVerses && currentView === views.READER) {
                renderChapterContent(selectedBook.id, selectedChapter, activeChapterVerses);
            } else {
                updateFilters();
            }
        }

        // Switch layout style between Verse List and Fluid Paragraphs
        function changeLayoutMode(layout) {
            stopTTS();
            currentLayoutMode = layout;
            closeSidebarOnMobile();
            
            const btnVerse = document.getElementById('btn-layout-verse');
            const btnPara = document.getElementById('btn-layout-para');
            
            if (layout === 'verse') {
                btnVerse.classList.add('active');
                btnPara.classList.remove('active');
            } else {
                btnVerse.classList.remove('active');
                btnPara.classList.add('active');
            }
            
            // Re-render immediately if viewing reader
            if (activeChapterVerses && currentView === views.READER) {
                renderChapterContent(selectedBook.id, selectedChapter, activeChapterVerses);
            }
        }

        // Focus single version when clicking on badge in reader
        function focusSingleVersion(version) {
            const selectEl = document.getElementById('single-version-select');
            if (selectEl) selectEl.value = version;
            singleFocusVersion = version;
            changeReadingMode('single');
        }

        // Set single version via sidebar select
        function setSingleVersion(version) {
            stopTTS();
            singleFocusVersion = version;
            closeSidebarOnMobile();
            
            // Update single color picker value to match new version
            const singlePicker = document.getElementById('single-color-picker');
            if (singlePicker) {
                singlePicker.value = getComputedColorHex(version);
            }
            
            const banner = document.getElementById('single-mode-banner');
            if (banner && currentReadingMode === 'single') {
                const strong = banner.querySelector('strong');
                if (strong) {
                    strong.style.color = `var(--color-${singleFocusVersion})`;
                    strong.innerText = VERSION_DETAILS[singleFocusVersion].label;
                }
            }
            
            // Re-render immediately to show this version's text/colors
            if (activeChapterVerses && currentView === views.READER) {
                renderChapterContent(selectedBook.id, selectedChapter, activeChapterVerses);
            } else {
                updateFilters();
            }
        }

        // Change version color dynamically and persist in localStorage
        function changeVersionColor(version, hexColor) {
            document.documentElement.style.setProperty(`--color-${version}`, hexColor);
            
            const isLight = document.body.classList.contains('light-theme');
            const storageKey = isLight ? `color-${version}-light` : `color-${version}-dark`;
            localStorage.setItem(storageKey, hexColor);
            
            // Sync translation cards picker value
            const picker = document.getElementById(`picker-${version}`);
            if (picker) picker.value = hexColor;
            
            // Sync Single Focus panel picker value
            const singlePicker = document.getElementById('single-color-picker');
            if (singlePicker && version === singleFocusVersion) {
                singlePicker.value = hexColor;
            }
        }

        // Load custom colors from localStorage or default values
        function loadCustomColors() {
            const isLight = document.body.classList.contains('light-theme');
            const isDim = document.body.classList.contains('dim-theme');
            const themeKey = isLight ? 'light' : (isDim ? 'dim' : 'dark');
            
            versionOrder.forEach(v => {
                const storageKey = `color-${v}-${themeKey}`;
                const savedColor = localStorage.getItem(storageKey);
                if (savedColor) {
                    document.documentElement.style.setProperty(`--color-${v}`, savedColor);
                } else {
                    document.documentElement.style.removeProperty(`--color-${v}`);
                }
                
                const picker = document.getElementById(`picker-${v}`);
                if (picker) {
                    picker.value = getComputedColorHex(v);
                }
            });
            
            const singlePicker = document.getElementById('single-color-picker');
            if (singlePicker) {
                singlePicker.value = getComputedColorHex(singleFocusVersion);
            }

            // --- Apply Custom Theme base colors ---
            const appBg = localStorage.getItem(`app-bg-${themeKey}`);
            const appText = localStorage.getItem(`app-text-${themeKey}`);
            const appSurface = localStorage.getItem(`app-surface-${themeKey}`);
            const appAccent = localStorage.getItem(`app-accent-${themeKey}`);
            
            const bgInput = document.getElementById('theme-color-bg');
            const textInput = document.getElementById('theme-color-text');
            const surfaceInput = document.getElementById('theme-color-surface');
            const accentInput = document.getElementById('theme-color-accent');
            
            if (appBg) {
                document.documentElement.style.setProperty('--bg-base', appBg);
                if (bgInput) bgInput.value = appBg;
            } else {
                document.documentElement.style.removeProperty('--bg-base');
                if (bgInput) {
                    if (isLight) bgInput.value = '#f8fafc';
                    else if (isDim) bgInput.value = '#1a2035';
                    else bgInput.value = '#090d16';
                }
            }
            
            if (appText) {
                document.documentElement.style.setProperty('--text-primary', appText);
                if (textInput) textInput.value = appText;
            } else {
                document.documentElement.style.removeProperty('--text-primary');
                if (textInput) {
                    if (isLight) textInput.value = '#0f172a';
                    else if (isDim) textInput.value = '#dde4f0';
                    else textInput.value = '#f8fafc';
                }
            }

            if (appAccent) {
                document.documentElement.style.setProperty('--color-accent', appAccent);
                const rgb = hexToRgb(appAccent);
                if (rgb) {
                    document.documentElement.style.setProperty('--color-accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
                }
                if (accentInput) accentInput.value = appAccent;
            } else {
                document.documentElement.style.removeProperty('--color-accent');
                document.documentElement.style.removeProperty('--color-accent-rgb');
                if (accentInput) {
                    if (isLight) accentInput.value = '#d97706';
                    else if (isDim) accentInput.value = '#f59e0b';
                    else accentInput.value = '#f59e0b';
                }
            }
            
            if (appSurface) {
                document.documentElement.style.setProperty('--bg-surface', appSurface);
                if (surfaceInput) surfaceInput.value = appSurface;
                
                const hoverColor = adjustBrightness(appSurface, isLight ? -8 : (isDim ? -6 : 8));
                document.documentElement.style.setProperty('--bg-surface-hover', hoverColor);
                
                const borderColor = adjustBrightness(appSurface, isLight ? -15 : (isDim ? -12 : 15));
                document.documentElement.style.setProperty('--border-color', borderColor);
            } else {
                document.documentElement.style.removeProperty('--bg-surface');
                document.documentElement.style.removeProperty('--bg-surface-hover');
                document.documentElement.style.removeProperty('--border-color');
                if (surfaceInput) {
                    if (isLight) surfaceInput.value = '#ffffff';
                    else if (isDim) surfaceInput.value = '#232d45';
                    else surfaceInput.value = '#0f172a';
                }
            }
        }

        // Helper to get resolved computed color hex
        function getComputedColorHex(version) {
            let color = getComputedStyle(document.documentElement).getPropertyValue(`--color-${version}`).trim();
            
            if (color.startsWith('#')) {
                return color;
            }
            
            // Fallback default HEX colors if computed variable resolves to CSS variable tokens rather than hex values
            const defaultsDark = {
                KJV: '#fbbf24',
                VP: '#34d399',
                VG: '#38bdf8',
                '09': '#c084fc',
                '60': '#fb7185',
                '65': '#818cf8',
                BO: '#fb923c'
            };
            const defaultsLight = {
                KJV: '#b45309',
                VP: '#059669',
                VG: '#0284c7',
                '09': '#7c3aed',
                '60': '#e11d48',
                '65': '#4f46e5',
                BO: '#ea580c'
            };
            
            const isLight = document.body.classList.contains('light-theme');
            return isLight ? defaultsLight[version] : defaultsDark[version];
        }

        // Font scaling
        function changeFontSize(direction) {
            currentFontScale = Math.max(0.6, Math.min(2.5, currentFontScale + direction));
            document.documentElement.style.setProperty('--font-scale', currentFontScale);
            document.getElementById('font-size-label').innerText = `${Math.round(currentFontScale * 100)}%`;
        }

        // Toggle Theme (Light/Dark/Dim Mode)
        function toggleTheme() {
            stopTTS();
            
            const isLight = document.body.classList.contains('light-theme');
            const isDim = document.body.classList.contains('dim-theme');
            
            document.body.classList.remove('light-theme', 'dim-theme');
            
            let newTheme = 'dark';
            if (isDim) {
                newTheme = 'dark';
            } else if (isLight) {
                document.body.classList.add('dim-theme');
                newTheme = 'dim';
            } else {
                document.body.classList.add('light-theme');
                newTheme = 'light';
            }
            
            localStorage.setItem('theme', newTheme);
            closeSidebarOnMobile();
            
            // Load custom colors for the new theme
            loadCustomColors();
            
            // If viewing a chapter, re-render to update direct styles (like paragraph colors)
            if (activeChapterVerses && currentView === views.READER) {
                renderChapterContent(selectedBook.id, selectedChapter, activeChapterVerses);
            }
        }

        // Sidebar drawer toggle for mobile viewports
        function toggleSidebar(event) {
            if (event) event.stopPropagation();
            const sidebar = document.getElementById('sidebar');
            const toggleBtn = document.getElementById('menu-toggle-btn');
            sidebar.classList.toggle('active');
            if (sidebar.classList.contains('active')) {
                toggleBtn.innerText = '✕';
            } else {
                toggleBtn.innerText = '☰';
            }
        }

        function closeSidebarOnMobile() {
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        }

        // --- Commentary and AI Chat Functionality ---
        let activeCommentary = null;       // Cache of commentaries for active chapter
        let studyPanelActiveVerse = null;  // Active verse object { bookId, chNum, verseNum }
        let chatHistoryByVerse = {};       // Maps "bookId_chNum_verseNum" to message array
        
        // Dynamic loading of commentary JS file for the active chapter
        function loadCommentaryData(bookId, chNum, targetVerse = null) {
            activeCommentary = null;
            
            // Close study panel dynamically when moving chapters (unless loading a specific target verse)
            if (!targetVerse) {
                closeStudyPanel();
            }
            
            const hasComm = COMMENTARY_METADATA && 
                           COMMENTARY_METADATA.has_commentary && 
                           COMMENTARY_METADATA.has_commentary[bookId] && 
                           COMMENTARY_METADATA.has_commentary[bookId].includes(chNum);
                           
            if (hasComm) {
                const commScript = document.createElement('script');
                commScript.src = `commentary_data/comm_${bookId}_${chNum}.js`;
                commScript.onload = function() {
                    // Script executed, will trigger load_commentary callback.
                    if (targetVerse) {
                        setTimeout(() => {
                            scrollToVerse(targetVerse);
                            openCommentary(bookId, chNum, targetVerse);
                        }, 200);
                    }
                };
                commScript.onerror = function() {
                    console.warn(`Could not load commentary file comm_${bookId}_${chNum}.js`);
                    if (targetVerse) {
                        setTimeout(() => scrollToVerse(targetVerse), 200);
                    }
                };
                document.head.appendChild(commScript);
            } else {
                if (targetVerse) {
                    setTimeout(() => {
                        scrollToVerse(targetVerse);
                        openCommentary(bookId, chNum, targetVerse);
                    }, 200);
                }
            }
        }
        
        // Callback invoked by the commentary JS chapter files
        window.bible_loader.load_commentary = function(bookId, chNum, commentaryData) {
            activeCommentary = commentaryData;
            // Update pane if we have the panel active on a verse in this chapter
            if (studyPanelActiveVerse && studyPanelActiveVerse.bookId === bookId && studyPanelActiveVerse.chNum === chNum) {
                renderCommentariesForVerse(studyPanelActiveVerse.verseNum);
            }
        };
        
        // Open the Study panel sliding drawer
        function openCommentary(bookId, chNum, verseNum) {
            studyPanelActiveVerse = { bookId, chNum, verseNum };
            
            const book = BIBLE_METADATA.find(b => b.id === bookId);
            const bName = currentLanguage === 'es' ? book.name_es : book.name_en;
            document.getElementById('study-verse-title').innerText = `${bName} ${chNum}:${verseNum}`;
            
            const panel = document.getElementById('study-panel');
            panel.classList.add('active');
            panel.style.right = '0'; // Ensure it's active and inline-styled to show
            
            const overlay = document.getElementById('study-overlay');
            if (overlay) overlay.classList.add('active');
            
            // Reset hidden state and show the collapse tab
            rightPanelHidden = false;
            showRightPanelCollapseBtn();
            
            const currentWidth = panel.offsetWidth || parseInt(panel.style.width) || 400;
            const mainPanel = document.querySelector('.main-panel');
            if (mainPanel) mainPanel.style.marginRight = `${currentWidth}px`;
            
            renderCommentariesForVerse(verseNum);
            updateChatContext();
        }
        
        // Close the Study Panel
        function closeStudyPanel() {
            studyPanelActiveVerse = null;
            const panel = document.getElementById('study-panel');
            panel.classList.remove('active');
            const currentWidth = panel.offsetWidth || parseInt(panel.style.width) || 400;
            panel.style.right = `-${currentWidth + 20}px`; // slide off-screen (with border/shadow)
            
            const overlay = document.getElementById('study-overlay');
            if (overlay) overlay.classList.remove('active');
            
            rightPanelHidden = true;
            showRightPanelCollapseBtn();
            
            const mainPanel = document.querySelector('.main-panel');
            if (mainPanel) mainPanel.style.marginRight = '0';
        }
        
        // Tab switching in Study panel
        function switchStudyTab(tabName) {
            const btnComm = document.getElementById('tab-btn-commentary');
            const btnChat = document.getElementById('tab-btn-chat');
            const contentComm = document.getElementById('study-tab-commentary-content');
            const contentChat = document.getElementById('study-tab-chat-content');
            
            if (tabName === 'commentary') {
                btnComm.classList.add('active');
                btnChat.classList.remove('active');
                contentComm.classList.add('active');
                contentChat.classList.remove('active');
            } else {
                btnComm.classList.remove('active');
                btnChat.classList.add('active');
                contentComm.classList.remove('active');
                contentChat.classList.add('active');
                
                // Focus chat input or API input
                setTimeout(() => {
                    const keyInput = document.getElementById('gemini-api-key');
                    const chatInput = document.getElementById('chat-input');
                    if (keyInput && document.getElementById('chat-key-section').style.display !== 'none') {
                        keyInput.focus();
                    } else if (chatInput) {
                        chatInput.focus();
                    }
                }, 100);
            }
        }
        
        // Render commentary list in drawer
        function renderCommentariesForVerse(verseNum) {
            const container = document.getElementById('commentaries-list-container');
            container.innerHTML = '';
            
            if (!activeCommentary || !activeCommentary[verseNum]) {
                const book = BIBLE_METADATA.find(b => b.id === studyPanelActiveVerse.bookId);
                const bookName = currentLanguage === 'es' ? book.name_es : book.name_en;
                const noticeText = UI_LANGS[currentLanguage].no_commentary;
                container.innerHTML = `<div class="no-commentary-notice">${noticeText} ${bookName} ${studyPanelActiveVerse.chNum}:${verseNum}.</div>`;
                return;
            }
            
            const comments = activeCommentary[verseNum];
            let html = '';
            
            for (const [commentator, text] of Object.entries(comments)) {
                html += `
                <details class="commentary-accordion">
                    <summary>${escapeHTML(commentator)}</summary>
                    <div class="commentary-content">${escapeHTML(text)}</div>
                </details>`;
            }
            
            container.innerHTML = html;
        }
        
        // --- Gemini AI Chat Agent ---
        function getVerseKey(bookId, chNum, verseNum) {
            return `${bookId}_${chNum}_${verseNum}`;
        }
        
        // Welcome and configure chat contexts
        function updateChatContext() {
            if (!studyPanelActiveVerse) return;
            const key = getVerseKey(studyPanelActiveVerse.bookId, studyPanelActiveVerse.chNum, studyPanelActiveVerse.verseNum);
            
            if (!chatHistoryByVerse[key]) {
                const book = BIBLE_METADATA.find(b => b.id === studyPanelActiveVerse.bookId);
                const bookName = currentLanguage === 'es' ? book.name_es : book.name_en;
                const welcomeText = currentLanguage === 'es' ?
                    `¡Hola! Soy su asistente de estudio bíblico con IA. He cargado el texto y los comentarios de **${bookName} ${studyPanelActiveVerse.chNum}:${studyPanelActiveVerse.verseNum}**. ¿Cómo puedo ayudarle a estudiar este versículo hoy?` :
                    `Hello! I am your AI Bible Study Assistant. I have loaded the text and commentaries for **${book.name_en} ${studyPanelActiveVerse.chNum}:${studyPanelActiveVerse.verseNum}**. How can I help you study this verse today?`;
                chatHistoryByVerse[key] = [
                    { role: 'model', parts: [{ text: welcomeText }] }
                ];
            }
            
            renderChatMessages(chatHistoryByVerse[key]);
            
            // Translate chat placeholder
            const chatPlaceholder = UI_LANGS[currentLanguage].chat_placeholder;
            const chatInput = document.getElementById('chat-input');
            if (chatInput) chatInput.placeholder = chatPlaceholder;
            
            // Read key from localStorage
            const savedKey = localStorage.getItem('gemini_api_key');
            if (savedKey) {
                document.getElementById('chat-key-section').style.display = 'none';
                document.getElementById('chat-pane').style.display = 'flex';
                document.getElementById('gemini-api-key').value = savedKey;
            } else {
                document.getElementById('chat-key-section').style.display = 'flex';
                document.getElementById('chat-pane').style.display = 'none';
            }
        }
        
        // Save Gemini key
        function saveGeminiKey() {
            const key = document.getElementById('gemini-api-key').value.trim();
            if (key) {
                localStorage.setItem('gemini_api_key', key);
                updateChatContext();
                
                // Refresh timeline paragraphs if in Spanish mode to trigger auto-translation
                if (typeof timelineIsLoaded !== 'undefined' && timelineIsLoaded && currentLanguage === 'es') {
                    if (selectedPerson1) {
                        filterParagraphsByPerson(selectedPerson1);
                    } else {
                        resetParagraphsFilter();
                    }
                }
            } else {
                alert("Please enter a valid API key.");
            }
        }
        
        function showKeySection() {
            document.getElementById('chat-key-section').style.display = 'flex';
            document.getElementById('chat-pane').style.display = 'none';
        }
        
        function clearChat() {
            if (!studyPanelActiveVerse) return;
            const key = getVerseKey(studyPanelActiveVerse.bookId, studyPanelActiveVerse.chNum, studyPanelActiveVerse.verseNum);
            delete chatHistoryByVerse[key];
            updateChatContext();
        }
        
        // Render messages array to panel
        function renderChatMessages(messages) {
            const container = document.getElementById('chat-messages');
            container.innerHTML = '';
            
            messages.forEach(msg => {
                const bubble = document.createElement('div');
                bubble.className = `chat-msg ${msg.role === 'model' ? 'assistant' : msg.role === 'user' ? 'user' : 'system'}`;
                
                const content = document.createElement('div');
                content.className = 'msg-content';
                
                if (msg.role === 'system') {
                    content.innerHTML = msg.parts[0].text;
                } else {
                    content.innerHTML = parseMarkdown(msg.parts[0].text);
                }
                
                bubble.appendChild(content);
                
                if (msg.role !== 'system') {
                    const meta = document.createElement('div');
                    meta.className = 'msg-meta';
                    meta.innerText = msg.role === 'model' ? 'Gemini AI' : 'You';
                    bubble.appendChild(meta);
                }
                
                container.appendChild(bubble);
            });
            
            container.scrollTop = container.scrollHeight;
        }
        
        // Post message to Gemini API
        async function sendChatMessage() {
            const inputEl = document.getElementById('chat-input');
            const query = inputEl.value.trim();
            if (!query) return;
            
            inputEl.value = '';
            
            const key = getVerseKey(studyPanelActiveVerse.bookId, studyPanelActiveVerse.chNum, studyPanelActiveVerse.verseNum);
            const history = chatHistoryByVerse[key];
            
            // Add user message
            history.push({ role: 'user', parts: [{ text: query }] });
            renderChatMessages(history);
            
            // Show typing indicator
            showTypingIndicator();
            
            const apiKey = localStorage.getItem('gemini_api_key');
            if (!apiKey) {
                removeTypingIndicator();
                addSystemErrorMessage("Gemini API key is missing. Please configuration your key.");
                return;
            }
            
            try {
                // Generate context variables
                const book = BIBLE_METADATA.find(b => b.id === studyPanelActiveVerse.bookId);
                const verseIdx = studyPanelActiveVerse.verseNum - 1;
                const verseData = activeChapterVerses ? activeChapterVerses[verseIdx] : {};
                
                let context = `You are a helpful, extremely knowledgeable AI Bible Study Assistant. The user is currently viewing the Bible verse: ${book.name_en} ${studyPanelActiveVerse.chNum}:${studyPanelActiveVerse.verseNum}.\n\n`;
                context += `Here is the specific text of this verse in different translations:\n`;
                const translations = {
                    'KJV': 'King James Version (English)',
                    'VP': 'Valera Purificada (Spanish)',
                    'VG': 'Reina Valera Gomez (Spanish)',
                    '09': 'RV 1909 (Spanish)',
                    '60': 'RV 1960 (Spanish)',
                    '65': 'RV 1865 (Spanish)',
                    'BO': 'Biblia del Oso 1569 (Spanish)'
                };
                for (const [vCode, vName] of Object.entries(translations)) {
                    if (verseData[vCode]) {
                        context += `- [${vName}]: ${verseData[vCode]}\n`;
                    }
                }
                
                context += `\nHere are the commentaries from various authors for this verse:\n`;
                if (activeCommentary && activeCommentary[studyPanelActiveVerse.verseNum]) {
                    const comments = activeCommentary[studyPanelActiveVerse.verseNum];
                    for (const [commentator, text] of Object.entries(comments)) {
                        context += `--- COMMENTARY BY ${commentator.toUpperCase()} ---\n${text}\n\n`;
                    }
                } else {
                    context += `No commentator texts are available for this verse.\n`;
                }
                
                context += `\nGuidelines for your response:\n`;
                context += `1. You are a general AI Bible Study Assistant. You are free to answer ANY questions the user asks about the Bible, theology, history, languages, or other chapters/verses. You are NOT limited to the active verse context.\n`;
                context += `2. If the user asks about the active verse or its commentaries, use the provided texts as your primary source of truth.\n`;
                context += `3. If the user asks general Bible study questions, summarizes chapters, or asks about other topics (including chronology, biblical lifespans, and Archbishop James Ussher's 'The Annals of the World' chronology represented in the app's timeline), use your broad training data to answer them accurately, comprehensively, and helpfully.\n`;
                context += `4. IMPORTANT: Explain to the user that this web app loads commentaries and translations dynamically for the active verse they click on. If they ask about commentaries for other verses or chapters (such as "do we have commentaries for Genesis 6?"), tell them that yes, commentaries are available for almost all chapters in the app, and they can load them into this chat by navigating to that chapter/verse in the main reader pane and clicking on the verse number or bubble icon next to it.\n`;
                context += `5. Speak in a respectful, academic yet accessible, study-oriented tone. Respond in the language the user writes in (English or Spanish).`;
                
                // Formulate Gemini request payload
                const contents = history.map(msg => ({
                    role: msg.role === 'model' ? 'model' : 'user',
                    parts: [{ text: msg.parts[0].text }]
                }));
                
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: contents,
                        systemInstruction: {
                            parts: [{ text: context }]
                        }
                    })
                });
                
                removeTypingIndicator();
                
                if (!response.ok) {
                    const errData = await response.json();
                    const errMsg = errData.error?.message || "Unknown API error";
                    addSystemErrorMessage(`API Error: ${errMsg}`);
                    return;
                }
                
                const result = await response.json();
                const replyText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
                
                // Add model response
                history.push({ role: 'model', parts: [{ text: replyText }] });
                renderChatMessages(history);
                // Read response out loud if voice mode is active
                if (liveVoiceActive || usedVoiceQuery) {
                    speakChatbotResponse(replyText);
                }
                
            } catch (error) {
                removeTypingIndicator();
                addSystemErrorMessage(`Network Error: ${error.message}`);
            }
        }
        
        function showTypingIndicator() {
            const container = document.getElementById('chat-messages');
            const indicator = document.createElement('div');
            indicator.id = 'chat-typing-indicator';
            indicator.className = 'chat-msg assistant';
            indicator.innerHTML = `
                <div class="msg-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            container.appendChild(indicator);
            container.scrollTop = container.scrollHeight;
        }
        
        function removeTypingIndicator() {
            const el = document.getElementById('chat-typing-indicator');
            if (el) el.parentNode.removeChild(el);
        }
        
        function addSystemErrorMessage(text) {
            const key = getVerseKey(studyPanelActiveVerse.bookId, studyPanelActiveVerse.chNum, studyPanelActiveVerse.verseNum);
            chatHistoryByVerse[key].push({ role: 'system', parts: [{ text: `<span style="color: var(--color-60); font-weight: 600;">${text}</span>` }] });
            renderChatMessages(chatHistoryByVerse[key]);
        }
        
        // Basic Markdown parser
        function parseMarkdown(text) {
            let html = text;
            html = escapeHTML(html);
            
            // Bold
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Italics
            html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
            // Lists
            html = html.replace(/^\s*-\s+(.*?)$/gm, '<li>$1</li>');
            html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
            html = html.replace(/<\/ul>\s*<ul>/g, '');
            // Newlines
            html = html.replace(/\n/g, '<br>');
            
            return html;
        }
        
        function escapeHTML(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
        
        // --- Reference Search ---
        function handleSearch() {
            const query = document.getElementById('global-search-input').value.trim();
            if (!query) return;
            
            // Match patterns like "Genesis 1:1", "1 John 3:16", "Rom 1", "Gen 1:1"
            const regex = /^\s*(?:([1-3])\s+)?([A-Za-z\u00c0-\u00ff]+)\s+(\d+)(?:\s*[\s::,.-]\s*(\d+))?\s*$/i;
            const match = query.match(regex);
            
            if (!match) {
                alert("Search format invalid. Try examples: 'Rom 1:16', '1 Jn 3:16', or 'Genesis 1'.");
                return;
            }
            
            const prefixNum = match[1];
            const namePart = match[2].toLowerCase();
            const chNum = parseInt(match[3]);
            const verseNum = match[4] ? parseInt(match[4]) : null;
            
            let searchName = namePart;
            if (prefixNum) {
                searchName = `${prefixNum} ${namePart}`;
            }
            
            let matchedBook = null;
            for (const book of BIBLE_METADATA) {
                const en = book.name_en.toLowerCase();
                const es = book.name_es.toLowerCase();
                if (en === searchName || es === searchName) {
                    matchedBook = book;
                    break;
                }
            }
            
            if (!matchedBook) {
                // Abbreviation check
                for (const book of BIBLE_METADATA) {
                    const en = book.name_en.toLowerCase();
                    const es = book.name_es.toLowerCase();
                    if (en.startsWith(searchName) || es.startsWith(searchName)) {
                        matchedBook = book;
                        break;
                    }
                }
            }
            
            if (!matchedBook) {
                alert(`Book "${searchName}" was not recognized.`);
                return;
            }
            
            if (chNum < 1 || chNum > matchedBook.chapters) {
                alert(`Chapter ${chNum} does not exist in ${matchedBook.name_en}. Max chapters: ${matchedBook.chapters}.`);
                return;
            }
            
            selectedBook = matchedBook;
            loadChapter(chNum, verseNum);
        }

        
        // Floating action chatbot trigger
        function openAIChatbot() {
            const verseNum = studyPanelActiveVerse ? studyPanelActiveVerse.verseNum : 1;
            const bid = selectedBook ? selectedBook.id : 1;
            const ch = selectedChapter ? selectedChapter : 1;
            openCommentary(bid, ch, verseNum);
            switchStudyTab('chat');
        }

        // Custom Theme Color Customizers
        function changeAppThemeColor(type, hexColor) {
            const isLight = document.body.classList.contains('light-theme');
            const isDim = document.body.classList.contains('dim-theme');
            const themeKey = isLight ? 'light' : (isDim ? 'dim' : 'dark');
            
            if (type === 'bg') {
                document.documentElement.style.setProperty('--bg-base', hexColor);
                localStorage.setItem(`app-bg-${themeKey}`, hexColor);
            } else if (type === 'text') {
                document.documentElement.style.setProperty('--text-primary', hexColor);
                localStorage.setItem(`app-text-${themeKey}`, hexColor);
            } else if (type === 'accent') {
                document.documentElement.style.setProperty('--color-accent', hexColor);
                localStorage.setItem(`app-accent-${themeKey}`, hexColor);
                
                const rgb = hexToRgb(hexColor);
                if (rgb) {
                    document.documentElement.style.setProperty('--color-accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
                }
            } else if (type === 'surface') {
                document.documentElement.style.setProperty('--bg-surface', hexColor);
                localStorage.setItem(`app-surface-${themeKey}`, hexColor);
                
                // Derive hover and border colors dynamically
                const hoverColor = adjustBrightness(hexColor, isLight ? -8 : (isDim ? -6 : 8));
                document.documentElement.style.setProperty('--bg-surface-hover', hoverColor);
                
                const borderColor = adjustBrightness(hexColor, isLight ? -15 : (isDim ? -12 : 15));
                document.documentElement.style.setProperty('--border-color', borderColor);
            }
        }

        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        
        function resetAppThemeColors() {
            const isLight = document.body.classList.contains('light-theme');
            const isDim = document.body.classList.contains('dim-theme');
            const themeKey = isLight ? 'light' : (isDim ? 'dim' : 'dark');
            
            localStorage.removeItem(`app-bg-${themeKey}`);
            localStorage.removeItem(`app-text-${themeKey}`);
            localStorage.removeItem(`app-surface-${themeKey}`);
            localStorage.removeItem(`app-accent-${themeKey}`);
            
            location.reload();
        }
        
        function adjustBrightness(hex, percent) {
            let R = parseInt(hex.substring(1, 3), 16);
            let G = parseInt(hex.substring(3, 5), 16);
            let B = parseInt(hex.substring(5, 7), 16);
            
            R = parseInt(R * (100 + percent) / 100);
            G = parseInt(G * (100 + percent) / 100);
            B = parseInt(B * (100 + percent) / 100);
            
            R = (R < 255) ? R : 255;
            G = (G < 255) ? G : 255;
            B = (B < 255) ? B : 255;
            
            R = (R > 0) ? R : 0;
            G = (G > 0) ? G : 0;
            B = (B > 0) ? B : 0;
            
            const rHex = R.toString(16).padStart(2, '0');
            const gHex = G.toString(16).padStart(2, '0');
            const bHex = B.toString(16).padStart(2, '0');
            
            return `#${rHex}${gHex}${bHex}`;
        }

        // --- PWA Service Worker Registration ---
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => {
                        console.log('Service Worker registered successfully');
                        // Service Worker auto-update detection
                        reg.onupdatefound = () => {
                            const installingWorker = reg.installing;
                            if (installingWorker) {
                                installingWorker.onstatechange = () => {
                                    if (installingWorker.state === 'installed') {
                                        if (navigator.serviceWorker.controller) {
                                            console.log('New service worker installed. Force reloading...');
                                            location.reload();
                                        }
                                    }
                                };
                            }
                        };
                    })
                    .catch(err => console.error('Service Worker registration failed:', err));
            });
        }


        // Scroll actions
        function scrollToTop() {
            document.getElementById('display-pane').scrollTop = 0;
        }

        
        // ==========================================
        // === DYNAMIC TIMELINE & VOICE INJECTIONS ===
        // ==========================================
        
        // --- 1. Selection-Based TTS Control ---
        let ttsBubble = document.createElement('button');
        ttsBubble.id = 'tts-selection-bubble';
        ttsBubble.className = 'tts-bubble';
        ttsBubble.style.position = 'absolute';
        ttsBubble.style.display = 'none';
        ttsBubble.style.zIndex = '1000';
        document.body.appendChild(ttsBubble);
        
        let selectedVerseNum = null;
        
        document.addEventListener('mouseup', function(e) {
            setTimeout(() => {
                const sel = window.getSelection();
                if (!sel || sel.isCollapsed || sel.toString().trim() === '') {
                    ttsBubble.style.display = 'none';
                    return;
                }
                
                const pane = document.getElementById('display-pane');
                if (!pane || !pane.contains(sel.anchorNode)) {
                    ttsBubble.style.display = 'none';
                    return;
                }
                
                let node = sel.anchorNode;
                selectedVerseNum = null;
                let detectedVersion = null;
                
                while (node && node !== document.body) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.id && node.id.startsWith('v-')) {
                            selectedVerseNum = parseInt(node.id.substring(2));
                        }
                        const versionClass = Array.from(node.classList).find(c => c.startsWith('vt-'));
                        if (versionClass) {
                            detectedVersion = versionClass.substring(3);
                        }
                    }
                    node = node.parentNode;
                }
                
                if (detectedVersion) {
                    singleFocusVersion = detectedVersion;
                    // Force reloading matching voices and sync voice select
                    populateVoices();
                }
                
                if (selectedVerseNum !== null && !isNaN(selectedVerseNum)) {
                    const range = sel.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    const t = currentLanguage === 'es' ? 'Leer desde aquí' : 'Read from here';
                    ttsBubble.innerText = `▶ ${t}`;
                    ttsBubble.style.left = `${rect.left + window.scrollX + (rect.width / 2) - 60}px`;
                    ttsBubble.style.top = `${rect.top + window.scrollY - 40}px`;
                    ttsBubble.style.display = 'block';
                } else {
                    ttsBubble.style.display = 'none';
                }
            }, 50);
        });
        
        document.addEventListener('mousedown', function(e) {
            if (e.target !== ttsBubble) {
                ttsBubble.style.display = 'none';
            }
        });
        
        ttsBubble.addEventListener('click', function() {
            if (selectedVerseNum !== null) {
                startTTSFromVerse(selectedVerseNum);
                ttsBubble.style.display = 'none';
                window.getSelection().removeAllRanges();
            }
        });
        
        function startTTSFromVerse(verseNum) {
            if (typeof speechSynthesis === 'undefined') {
                alert("Text-to-speech is not supported in this browser.");
                return;
            }
            speechSynthesis.cancel();
            isSpeaking = true;
            ttsQueue = [];
            ttsIndex = 0;
            
            // Queue verses starting from verseNum
            activeChapterVerses.forEach((verse, idx) => {
                const vNum = idx + 1;
                if (vNum < verseNum) return;
                
                const rawText = verse[singleFocusVersion] || "";
                if (!rawText) return;
                
                let cleanText = rawText.replace(/¶/g, '');
                cleanText = cleanText.replace(/\*/g, '');
                cleanText = cleanText.replace(/[‹›]/g, '');
                
                ttsQueue.push({
                    text: cleanText,
                    verseNum: vNum
                });
            });
            
            if (ttsQueue.length > 0) {
                updateTTSButtons();
                speakNextInQueue();
            } else {
                stopTTS();
            }
        }
        
        // --- 2. AI Voice Chat & Dictation Logic ---
        let chatRecognition = null;
        let liveVoiceActive = false;
        let isChatbotSpeaking = false;
        let usedVoiceQuery = false;
        
        function initSpeechRecognition() {
            if (chatRecognition) return;
            
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                console.warn("Speech recognition not supported in this browser.");
                return;
            }
            
            chatRecognition = new SpeechRecognition();
            chatRecognition.continuous = false;
            chatRecognition.interimResults = false;
            
            chatRecognition.onstart = () => {
                const micBtn = document.getElementById('chat-mic-btn');
                if (micBtn) {
                    micBtn.classList.add('active');
                    micBtn.innerText = '🎙️';
                }
                const textarea = document.getElementById('chat-input');
                if (textarea) {
                    textarea.placeholder = currentLanguage === 'es' ? 'Escuchando...' : 'Listening...';
                }
                usedVoiceQuery = true;
            };
            
            chatRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const textarea = document.getElementById('chat-input');
                if (textarea) {
                    textarea.value = transcript;
                }
                sendChatMessage();
            };
            
            chatRecognition.onerror = (e) => {
                console.error("Speech recognition error:", e);
                if (liveVoiceActive && e.error !== 'aborted') {
                    setTimeout(startVoiceListening, 1000);
                }
            };
            
            chatRecognition.onend = () => {
                resetMicButton();
                if (liveVoiceActive && !isChatbotSpeaking) {
                    setTimeout(startVoiceListening, 600);
                }
            };
        }
        
        function resetMicButton() {
            const micBtn = document.getElementById('chat-mic-btn');
            if (micBtn) {
                micBtn.classList.remove('active');
                micBtn.innerText = '🎤';
            }
            const textarea = document.getElementById('chat-input');
            if (textarea) {
                textarea.placeholder = currentLanguage === 'es' ? 'Haz una pregunta sobre este versículo...' : 'Ask a question about this verse...';
            }
        }
        
        function startVoiceListening() {
            initSpeechRecognition();
            if (!chatRecognition) return;
            
            if (typeof speechSynthesis !== 'undefined') {
                speechSynthesis.cancel();
            }
            
            try {
                chatRecognition.lang = currentLanguage === 'es' ? 'es-ES' : 'en-US';
                chatRecognition.start();
            } catch (e) {
                console.warn("Failed to start speech recognition:", e);
            }
        }
        
        function toggleChatMic() {
            initSpeechRecognition();
            if (!chatRecognition) {
                alert("Speech recognition is not supported in this browser.");
                return;
            }
            
            if (liveVoiceActive) {
                document.getElementById('live-voice-toggle').checked = false;
                toggleLiveVoice(false);
                return;
            }
            
            startVoiceListening();
        }
        
        function toggleLiveVoice(isActive) {
            liveVoiceActive = isActive;
            if (isActive) {
                startVoiceListening();
            } else {
                if (chatRecognition) {
                    chatRecognition.abort();
                }
                if (typeof speechSynthesis !== 'undefined') {
                    speechSynthesis.cancel();
                }
                isChatbotSpeaking = false;
                usedVoiceQuery = false;
                resetMicButton();
            }
        }
        
        function speakChatbotResponse(text) {
            if (typeof speechSynthesis === 'undefined') return;
            
            speechSynthesis.cancel();
            if (chatRecognition) {
                chatRecognition.abort();
            }
            
            isChatbotSpeaking = true;
            
            // Strip markdown formatting for cleaner speech synthesis
            let cleanText = text.replace(/[*#_`~]/g, '');
            // Strip citation references (e.g. Genesis 1:1) for smoother reading
            cleanText = cleanText.replace(/\b[A-Za-z0-9\s]+?\s+\d+:\d+(-\d+)?\b/g, '');
            
            const utterance = new SpeechSynthesisUtterance(cleanText);
            const isEs = (currentLanguage === 'es');
            utterance.lang = isEs ? 'es-ES' : 'en-US';
            
            // Match with selected TTS voice if possible
            const select = document.getElementById('tts-voice-select');
            if (select && select.value) {
                const voice = ttsVoices.find(v => v.name === select.value);
                if (voice) utterance.voice = voice;
            }
            
            utterance.onend = function() {
                isChatbotSpeaking = false;
                usedVoiceQuery = false;
                if (liveVoiceActive) {
                    startVoiceListening();
                }
            };
            
            utterance.onerror = function(e) {
                console.error("Chatbot speech error:", e);
                isChatbotSpeaking = false;
                usedVoiceQuery = false;
                if (liveVoiceActive) {
                    startVoiceListening();
                }
            };
            
            speechSynthesis.speak(utterance);
        }
        
        // --- 3. Ussher Chronology Timeline Logic ---
        let selectedPerson1 = null;
        let selectedPerson2 = null;
        let timelineIsLoaded = false;
        let personLifespans = {};
        let timelineUseCtrlToCompare = true;
        
        const timelineNameMap = {
            "Adam": "Adán",
            "Eve": "Eva",
            "Cain": "Caín",
            "Abel": "Abel",
            "Seth": "Set",
            "Enos": "Enós",
            "Cainan": "Cainán",
            "Mahalaleel": "Mahalaleel",
            "Jared": "Jared",
            "Enoch": "Enoc",
            "Methuselah": "Matusalén",
            "Lamech": "Lamec",
            "Noah": "Noé",
            "Shem": "Sem",
            "Ham": "Cam",
            "Japheth": "Jafet",
            "Arphaxad": "Arfaxad",
            "Salah": "Salaj",
            "Eber": "Heber",
            "Peleg": "Peleg",
            "Reu": "Reu",
            "Serug": "Serug",
            "Nahor": "Nacor",
            "Terah": "Taré",
            "Abraham": "Abraham",
            "Sarah": "Sara",
            "Lot": "Lot",
            "Melchizedek": "Melquisedec",
            "Ishmael": "Ismael",
            "Isaac": "Isaac",
            "Rebekah": "Rebeca",
            "Esau": "Esaú",
            "Jacob": "Jacob",
            "Rachel": "Raquel",
            "Leah": "Lea",
            "Joseph": "José",
            "Benjamin": "Benjamín",
            "Levi": "Leví",
            "Amram": "Amram",
            "Moses": "Moisés",
            "Aaron": "Aarón",
            "Miriam": "María (Miriam)",
            "Joshua": "Josué",
            "Caleb": "Caleb",
            "Othniel": "Otoniel",
            "Ehud": "Aod",
            "Deborah": "Débora",
            "Gideon": "Gedeón",
            "Jephthah": "Jefté",
            "Samson": "Sansón",
            "Eli": "Elí",
            "Samuel": "Samuel",
            "Saul": "Saúl",
            "Jonathan": "Jonatán",
            "David": "David",
            "Solomon": "Salomón",
            "Rehoboam": "Roboam",
            "Jeroboam": "Jeroboam",
            "Abijah": "Abías",
            "Asa": "Asa",
            "Jehoshaphat": "Josafat",
            "Jehoram": "Joram",
            "Ahaziah": "Ocozías",
            "Athaliah": "Atalía",
            "Joash": "Joás",
            "Amaziah": "Amasías",
            "Uzziah": "Uzías",
            "Jotham": "Jotam",
            "Ahaz": "Acaz",
            "Hezekiah": "Ezequías",
            "Manasseh": "Manasés",
            "Amon": "Amón",
            "Josiah": "Josías",
            "Jehoahaz": "Joacaz",
            "Jehoiakim": "Joacim",
            "Jehoiachin": "Joaquín",
            "Zedekiah": "Sedequías",
            "Nebuchadnezzar": "Nabucodonosor",
            "Cyrus": "Ciro",
            "Darius": "Darío",
            "Xerxes": "Jerjes",
            "Artaxerxes": "Artajerjes",
            "Ezra": "Esdras",
            "Nehemiah": "Nehemías",
            "Esther": "Ester",
            "Mordecai": "Mardoqueo",
            "Daniel": "Daniel",
            "Ezekiel": "Ezequiel",
            "Isaiah": "Isaías",
            "Jeremiah": "Jeremías",
            "Hosea": "Oseas",
            "Joel": "Joel",
            "Amos": "Amós",
            "Obadiah": "Abdías",
            "Jonah": "Jonás",
            "Micah": "Miqueas",
            "Nahum": "Nahúm",
            "Habakkuk": "Habacuc",
            "Zephaniah": "Sofonías",
            "Haggai": "Hageo",
            "Zechariah": "Zacarías",
            "Malachi": "Malaquías",
            "Job": "Job",
            "Ruth": "Rut",
            "Boaz": "Booz"
        };

        function translateName(name) {
            if (currentLanguage === 'es') {
                return timelineNameMap[name] || name;
            }
            return name;
        }

        const timelineTranslations = {
            'en': {
                title: 'Chronology Timeline',
                subtitle: "Ussher's Annals of the World",
                searchPlaceholder: 'Search names (e.g. Moses)...',
                jumpTitle: 'Jump to Year',
                mentionsTitle: 'Bible Mentions',
                rulingKingdom: 'Ruling Kingdom',
                mentions: 'Mentions in Chronology',
                clearFilter: 'Clear Selection',
                lifespanDiff: 'Span Comparison',
                gapAnalysis: 'Gap & Overlap Analysis',
                startDiff: 'Birth Gap',
                endDiff: 'Death Gap',
                overlappedBy: 'Overlapped in life by',
                inactiveGapOf: 'Separated by a gap of',
                years: 'years',
                year: 'year',
                startedLater: 'born later',
                loading: 'Loading chronology timeline data...',
                errorData: 'Failed to load timeline data files.',
                noMentions: 'No direct Bible mentions found.',
                ctrlToCompare: 'Ctrl to Compare',
                normalCompare: 'Auto Compare'
            },
            'es': {
                title: 'Línea de Tiempo Cronológica',
                subtitle: "Anales del Mundo de Ussher",
                searchPlaceholder: 'Buscar nombres (ej. Moisés)...',
                jumpTitle: 'Saltar al Año',
                mentionsTitle: 'Menciones Bíblicas',
                rulingKingdom: 'Reino Gobernante',
                mentions: 'Menciones en Cronología',
                clearFilter: 'Limpiar Selección',
                lifespanDiff: 'Comparación de Ciclo',
                gapAnalysis: 'Análisis de Brechas y Solapamiento',
                startDiff: 'Diferencia de Nacimiento',
                endDiff: 'Diferencia de Muerte',
                overlappedBy: 'Se solaparon en vida por',
                inactiveGapOf: 'Separados por una brecha de',
                years: 'años',
                year: 'año',
                startedLater: 'nació después',
                loading: 'Cargando datos de la línea de tiempo...',
                errorData: 'Error al cargar los archivos de la línea de tiempo.',
                noMentions: 'No se encontraron menciones bíblicas directas.',
                ctrlToCompare: 'Ctrl para Comparar',
                normalCompare: 'Auto Comparar'
            }
        };
        
        let timelineScrollOffset = 0;
        let timelineDragStart = { x: 0, y: 0 };
        let timelineIsDragging = false;
        let timelineActiveParagraphs = [];
        let timelineLoadedCount = 0;
        let timelineObserver = null;
        
        const CANVAS_WIDTH = 12000;
        const MAX_AM = 4075;
        const AXIS_Y = 180;
        
        const lastPlacedOnTrack = {
            "-3": -999, "-2": -999, "-1": -999,
            "1": -999, "2": -999, "3": -999
        };
        const trackYOffsets = {
            "-3": 30,  "-2": 80,  "-1": 130, // Above axis line
            "1": 230, "2": 280, "3": 330  // Below axis line
        };
        const timelineNodes = [];
        
        let timelineEsLoading = false;
        function loadTimelineEs(callback) {
            if (window.UssherParagraphsES) {
                if (callback) callback();
                return;
            }
            if (timelineEsLoading) {
                const interval = setInterval(() => {
                    if (window.UssherParagraphsES) {
                        clearInterval(interval);
                        if (callback) callback();
                    }
                }, 100);
                return;
            }
            timelineEsLoading = true;
            
            const feed = document.getElementById('timeline-paragraphs-feed');
            const originalContent = feed ? feed.innerHTML : '';
            if (feed) {
                feed.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--color-accent); font-weight: bold;">Cargando cronología en español...</div>`;
            }
            
            const script = document.createElement('script');
            script.src = 'timeline_data_es.js';
            script.onload = function() {
                timelineEsLoading = false;
                if (feed) feed.innerHTML = originalContent;
                if (callback) callback();
            };
            script.onerror = function() {
                timelineEsLoading = false;
                console.error("Failed to load timeline_data_es.js");
                window.UssherParagraphsES = window.UssherParagraphs; // fallback
                if (feed) feed.innerHTML = originalContent;
                if (callback) callback();
            };
            document.head.appendChild(script);
        }

        function getUssherParagraphs() {
            return (currentLanguage === 'es' && window.UssherParagraphsES) ? window.UssherParagraphsES : window.UssherParagraphs;
        }

        function setTimelineLanguage(lang) {
            currentLanguage = lang;
            localStorage.setItem('app-lang', lang);
            
            // Sync with main app language button highlight
            const btnEn = document.getElementById('lang-btn-en');
            const btnEs = document.getElementById('lang-btn-es');
            if (btnEn && btnEs) {
                if (lang === 'en') {
                    btnEn.classList.add('active');
                    btnEs.classList.remove('active');
                } else {
                    btnEs.classList.add('active');
                    btnEn.classList.remove('active');
                }
            }
            
            applyLanguage();
            applyTimelineLanguage();
            
            if (lang === 'es' && timelineIsLoaded && !window.UssherParagraphsES) {
                loadTimelineEs(() => {
                    updateTimeline();
                    if (selectedPerson1) {
                        filterParagraphsByPerson(selectedPerson1);
                    } else {
                        resetParagraphsFilter();
                    }
                });
            } else {
                if (timelineIsLoaded) {
                    updateTimeline();
                    if (selectedPerson1) {
                        filterParagraphsByPerson(selectedPerson1);
                    } else {
                        resetParagraphsFilter();
                    }
                }
            }
            
            // Re-render sidebar if selection exists
            if (selectedPerson1) {
                renderSidebarCard();
                calculateContemporaries(selectedPerson1);
            }
        }
        
        function applyTimelineLanguage() {
            const t = timelineTranslations[currentLanguage];
            document.getElementById('timeline-title-text').innerText = t.title;
            document.getElementById('timeline-subtitle-text').innerText = t.subtitle;
            document.getElementById('timeline-search-bar').placeholder = t.searchPlaceholder;
            document.getElementById('timeline-jump-title').innerText = t.jumpTitle;
            document.getElementById('timeline-bible-mentions-title').innerText = t.mentionsTitle;
            
            const toggleText = document.getElementById('timeline-sidebar-toggle-text');
            if (toggleText) {
                toggleText.innerText = currentLanguage === 'es' ? 'Info & Filtros' : 'Info & Filters';
            }
            
            // Language toggles
            const tEn = document.getElementById('timeline-lang-en');
            const tEs = document.getElementById('timeline-lang-es');
            if (tEn && tEs) {
                if (currentLanguage === 'en') {
                    tEn.style.backgroundColor = 'var(--color-accent)';
                    tEn.style.color = 'var(--bg-base)';
                    tEs.style.backgroundColor = 'transparent';
                    tEs.style.color = 'var(--text-secondary)';
                } else {
                    tEs.style.backgroundColor = 'var(--color-accent)';
                    tEs.style.color = 'var(--bg-base)';
                    tEn.style.backgroundColor = 'transparent';
                    tEn.style.color = 'var(--text-secondary)';
                }
            }
            
            updateCompareModeButtonUI();
        }
        
        window.toggleTimelineCompareMode = function() {
            timelineUseCtrlToCompare = !timelineUseCtrlToCompare;
            updateCompareModeButtonUI();
        };
        
        function updateCompareModeButtonUI() {
            const btn = document.getElementById('timeline-compare-mode-btn');
            const iconEl = document.getElementById('compare-mode-icon');
            const textEl = document.getElementById('compare-mode-text');
            if (!btn || !textEl || !iconEl) return;
            
            const t = timelineTranslations[currentLanguage];
            if (timelineUseCtrlToCompare) {
                btn.style.borderColor = 'var(--color-accent)';
                btn.style.background = 'rgba(245, 158, 11, 0.08)';
                btn.style.color = 'var(--color-accent)';
                iconEl.innerText = '⌨️';
                textEl.innerText = t.ctrlToCompare || (currentLanguage === 'es' ? 'Modo Ctrl' : 'Ctrl Mode');
            } else {
                btn.style.borderColor = 'var(--border-color)';
                btn.style.background = 'rgba(255,255,255,0.03)';
                btn.style.color = 'var(--text-secondary)';
                iconEl.innerText = '🔄';
                textEl.innerText = t.normalCompare || (currentLanguage === 'es' ? 'Auto Comparar' : 'Auto Compare');
            }
        }
        
        window.toggleTimelineSidebar = function() {
            const sidebar = document.querySelector('#timeline-view .timeline-sidebar');
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
        };

        function toggleTimelineView() {
            stopTTS();
            const view = document.getElementById('timeline-view');
            if (view.style.display === 'none') {
                view.style.display = 'flex';
                // Load data dynamically if not loaded
                if (!timelineIsLoaded) {
                    const pane = document.getElementById('display-pane');
                    const originalHtml = pane.innerHTML;
                    pane.innerHTML = `<h2 class="toc-title" style="margin-top: 5rem;">${timelineTranslations[currentLanguage].loading}</h2>`;
                    
                    const script = document.createElement('script');
                    script.src = 'timeline_data.js';
                    script.onload = function() {
                        pane.innerHTML = originalHtml;
                        timelineIsLoaded = true;
                        // Copy curated lifespans
                        Object.assign(personLifespans, window.UssherCuratedLifespans);
                        applyTimelineLanguage();
                        if (currentLanguage === 'es') {
                            loadTimelineEs(initTimeline);
                        } else {
                            initTimeline();
                        }
                    };
                    script.onerror = function() {
                        pane.innerHTML = `
                        <div class="chapter-container" style="margin-top: 5rem; text-align: center;">
                            <h2 class="chapter-grid-title" style="color: var(--color-60);">${timelineTranslations[currentLanguage].errorData}</h2>
                            <button class="btn btn-primary" onclick="location.reload()">Reload</button>
                        </div>`;
                    };
                    document.head.appendChild(script);
                } else {
                    applyTimelineLanguage();
                    updateTimeline();
                }
            } else {
                view.style.display = 'none';
            }
        }
        
        function initTimeline() {
            buildTimelineStructure();
            renderLineTimeline();
            
            // Drag and drop timeline section horizontal scroll
            const section = document.getElementById('global-timeline-section');
            
            section.addEventListener('mousedown', function(e) {
                if (e.target.closest('.timeline-node-card')) return;
                timelineIsDragging = true;
                timelineDragStart.x = e.pageX - section.offsetLeft;
                timelineScrollOffset = section.scrollLeft;
                section.style.cursor = 'grabbing';
            });
            
            section.addEventListener('mouseleave', function() {
                timelineIsDragging = false;
                section.style.cursor = 'grab';
            });
            
            section.addEventListener('mouseup', function() {
                timelineIsDragging = false;
                section.style.cursor = 'grab';
            });
            
            section.addEventListener('mousemove', function(e) {
                if (!timelineIsDragging) return;
                e.preventDefault();
                const x = e.pageX - section.offsetLeft;
                const walk = (x - timelineDragStart.x) * 1.5;
                section.scrollLeft = timelineScrollOffset - walk;
            });
            
            // Initial view: Center on Abraham (2008 AM)
            centerTimelineOnYear(2008);
            
            // Load initial paragraphs feed
            timelineActiveParagraphs = getUssherParagraphs().slice(0, 100);
            renderBatch();
            setupInfiniteScroll();
        }
        
        function buildTimelineStructure() {
            timelineNodes.length = 0;
            // Reset stacking tracks
            for (let k in lastPlacedOnTrack) lastPlacedOnTrack[k] = -999;
            
            const figs = Object.keys(personLifespans).map(name => {
                return {
                    name: name,
                    range: personLifespans[name],
                    startAM: personLifespans[name].startAM
                };
            });
            
            // Sort by Birth/Start AM year chronologically
            figs.sort((a, b) => a.startAM - b.startAM);
            
            const tracks = [1, -1, 2, -2, 3, -3];
            
            figs.forEach(fig => {
                let assignedTrack = null;
                const minDistance = 180; // horizontal separation spacing on tracks
                
                for (let track of tracks) {
                    const lastStart = lastPlacedOnTrack[track];
                    if (fig.startAM - lastStart > minDistance) {
                        assignedTrack = track;
                        break;
                    }
                }
                
                if (assignedTrack === null) {
                    assignedTrack = 1;
                }
                
                lastPlacedOnTrack[assignedTrack] = fig.startAM;
                fig.track = assignedTrack;
                timelineNodes.push(fig);
            });
        }
        
        function renderLineTimeline() {
            const cardsContainer = document.getElementById('timeline-cards');
            const svgContainer = document.getElementById('timeline-svg');
            
            // Remove old grid
            const elementsToRemove = document.getElementById('timeline-canvas').querySelectorAll('.timeline-grid-vertical, .timeline-axis-tick, .timeline-tick-label');
            elementsToRemove.forEach(el => el.remove());
            cardsContainer.innerHTML = '';
            svgContainer.innerHTML = '';
            
            // 1. Draw Year Ticks (every 100 years)
            const tickFragment = document.createDocumentFragment();
            for (let yr = 100; yr <= MAX_AM; yr += 100) {
                const pct = yr / MAX_AM;
                const x = pct * CANVAS_WIDTH;
                
                // Vertical grid lines
                const grid = document.createElement('div');
                grid.className = 'timeline-grid-vertical';
                grid.style.position = 'absolute';
                grid.style.top = '0';
                grid.style.bottom = '0';
                grid.style.width = '1px';
                grid.style.background = 'rgba(255,255,255,0.03)';
                grid.style.left = `${x}px`;
                tickFragment.appendChild(grid);
                
                // Tick lines
                const tick = document.createElement('div');
                tick.className = 'timeline-axis-tick';
                tick.style.position = 'absolute';
                tick.style.left = `${x}px`;
                tick.style.top = '172px';
                tick.style.height = '18px';
                tick.style.width = '1px';
                tick.style.background = 'var(--color-accent)';
                tickFragment.appendChild(tick);
                
                // Year Label
                const label = document.createElement('div');
                const isEven = (yr / 100) % 2 === 0;
                label.className = `timeline-tick-label ${isEven ? 'tick-above' : 'tick-below'}`;
                label.style.position = 'absolute';
                label.style.left = `${x}px`;
                label.style.transform = 'translateX(-50%)';
                label.style.fontSize = '0.7rem';
                label.style.fontWeight = 'bold';
                label.style.color = 'var(--text-secondary)';
                
                if (isEven) {
                    label.style.top = '145px';
                } else {
                    label.style.top = '198px';
                }
                
                const amText = currentLanguage === 'es' ? 'A.M.' : 'AM';
                label.innerHTML = `${yr} ${amText}<br><span style="font-size:0.6rem; color:var(--color-accent); font-weight:normal;">${amToBcad(yr)}</span>`;
                tickFragment.appendChild(label);
            }
            document.getElementById('timeline-canvas').appendChild(tickFragment);
            
            // 2. Render Figure Cards & connector lines
            const cardFragment = document.createDocumentFragment();
            timelineNodes.forEach(node => {
                // Card sits at birth year x coordinate initially
                const x = (node.range.startAM / MAX_AM) * CANVAS_WIDTH;
                const track = node.track;
                const cardY = trackYOffsets[track];
                
                const finalLeft = node.customLeft !== undefined ? node.customLeft : x;
                const finalTop = node.customTop !== undefined ? node.customTop : cardY;
                
                // Draw connector line
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('id', `line-${escapeId(node.name)}`);
                
                // Compute connector y1 attachment based on position above/below axis
                const tempCardHeight = 52;
                const lineY1 = (finalTop < AXIS_Y) ? (finalTop + tempCardHeight) : finalTop;
                
                line.setAttribute('x1', finalLeft);
                line.setAttribute('y1', lineY1);
                line.setAttribute('x2', x);
                line.setAttribute('y2', AXIS_Y);
                line.setAttribute('stroke', 'rgba(245, 158, 11, 0.15)');
                line.setAttribute('stroke-width', '1');
                line.setAttribute('stroke-dasharray', '3,3');
                svgContainer.appendChild(line);
                
                // Card Div
                const card = document.createElement('div');
                card.className = 'timeline-node-card';
                card.id = `node-${escapeId(node.name)}`;
                card.style.position = 'absolute';
                card.style.left = `${finalLeft}px`;
                card.style.top = `${finalTop}px`;
                card.style.transform = 'translateX(-50%)'; // center over birth year
                card.style.pointerEvents = 'auto';
                card.style.cursor = 'grab';
                card.style.background = 'var(--bg-card)';
                card.style.border = '1px solid var(--border-color)';
                card.style.borderRadius = '8px';
                card.style.padding = '8px 12px';
                card.style.minWidth = '130px';
                card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                card.style.transition = 'border-color 0.2s ease, box-shadow 0.2s ease';
                
                if (selectedPerson1 === node.name) {
                    card.style.borderColor = 'var(--color-accent)';
                    card.style.boxShadow = '0 0 10px rgba(245,158,11,0.3)';
                    line.setAttribute('stroke', 'var(--color-accent)');
                    line.setAttribute('stroke-width', '2');
                    line.setAttribute('stroke-dasharray', '0');
                } else if (selectedPerson2 === node.name) {
                    card.style.borderColor = '#10b981';
                    card.style.boxShadow = '0 0 10px rgba(16,185,129,0.3)';
                    line.setAttribute('stroke', '#10b981');
                    line.setAttribute('stroke-width', '2');
                    line.setAttribute('stroke-dasharray', '0');
                }
                
                const startBCAD = amToBcad(node.range.startAM);
                const endBCAD = amToBcad(node.range.endAM);
                const kingdom = getRulingKingdom(node.range.startAM, node.range.endAM);
                
                const displayName = translateName(node.name);
                card.innerHTML = `
                    <div class="node-name" style="font-weight:700; font-size:0.85rem; color:var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;" title="${displayName}">${displayName}</div>
                    <div class="node-dates" style="font-size:0.7rem; color:var(--color-accent); margin: 2px 0;">${startBCAD} - ${endBCAD}</div>
                    <div class="node-kingdom" style="font-size:0.6rem; color:var(--text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;" title="${kingdom}">${kingdom}</div>
                `;
                
                cardFragment.appendChild(card);
                
                // Initialize dragging after card is attached
                setTimeout(() => {
                    makeCardDraggable(card, node);
                }, 0);
            });
            cardsContainer.appendChild(cardFragment);
        }
        
        function handleTimelineCardClick(name, isCompare) {
            if (!timelineUseCtrlToCompare) {
                isCompare = (selectedPerson1 !== null && selectedPerson1 !== name);
            }
            
            if (isCompare) {
                if (selectedPerson1 === null) {
                    selectPrimary(name);
                } else if (selectedPerson1 === name) {
                    clearAllSelection();
                } else if (selectedPerson2 === name) {
                    // Toggle off secondary
                    selectedPerson2 = null;
                    document.getElementById('timeline-highlight-bar').style.display = 'none';
                    document.getElementById('timeline-highlight-label').style.display = 'none';
                    renderLineTimeline();
                    renderSidebarCard();
                } else {
                    // Set as secondary
                    selectSecondary(name);
                }
            } else {
                // Single-select mode (regular click)
                if (selectedPerson1 === name) {
                    clearAllSelection();
                } else {
                    selectPrimary(name);
                }
            }
        }
        
        function selectPrimary(name) {
            selectedPerson1 = name;
            selectedPerson2 = null;
            document.getElementById('timeline-highlight-bar').style.display = 'none';
            document.getElementById('timeline-highlight-label').style.display = 'none';
            
            renderLineTimeline();
            renderSidebarCard();
            
            // Scroll paragraphs feed to show paragraphs mentioning this person
            filterParagraphsByPerson(name);
            calculateContemporaries(name);
            
            // Slide open sidebar on mobile
            if (window.innerWidth <= 1024) {
                const sidebar = document.querySelector('#timeline-view .timeline-sidebar');
                if (sidebar) {
                    sidebar.classList.add('active');
                }
            }
        }
        
        function selectSecondary(name) {
            selectedPerson2 = name;
            renderLineTimeline();
            drawTimelineGapHighlight();
            renderSidebarCard();
            
            // Slide open sidebar on mobile
            if (window.innerWidth <= 1024) {
                const sidebar = document.querySelector('#timeline-view .timeline-sidebar');
                if (sidebar) {
                    sidebar.classList.add('active');
                }
            }
        }
        
        function clearAllSelection() {
            selectedPerson1 = null;
            selectedPerson2 = null;
            document.getElementById('timeline-highlight-bar').style.display = 'none';
            document.getElementById('timeline-highlight-label').style.display = 'none';
            document.getElementById('timeline-selected-person-card').style.display = 'none';
            document.getElementById('timeline-bible-mentions-section').style.display = 'none';
            
            renderLineTimeline();
            resetParagraphsFilter();
        }
        
        function deselectPerson(idx) {
            if (idx === 1) {
                if (selectedPerson2 !== null) {
                    const nextPrimary = selectedPerson2;
                    selectedPerson1 = null;
                    selectedPerson2 = null;
                    selectPrimary(nextPrimary);
                } else {
                    clearAllSelection();
                }
            } else if (idx === 2) {
                selectedPerson2 = null;
                document.getElementById('timeline-highlight-bar').style.display = 'none';
                document.getElementById('timeline-highlight-label').style.display = 'none';
                renderLineTimeline();
                renderSidebarCard();
            }
        }
        
        function drawTimelineGapHighlight() {
            const range1 = personLifespans[selectedPerson1];
            const range2 = personLifespans[selectedPerson2];
            if (!range1 || !range2) return;
            
            const t = timelineTranslations[currentLanguage];
            
            // Check overlap
            const overlap = Math.max(range1.startAM, range2.startAM) <= Math.min(range1.endAM, range2.endAM);
            let gapYears, text, color;
            
            const startBirth = Math.min(range1.startAM, range2.startAM);
            const endBirth = Math.max(range1.startAM, range2.startAM);
            const birthDiff = endBirth - startBirth;
            
            const diffLabel = currentLanguage === 'es' ? 'dif. de nacimiento' : 'birth diff';
            const yearText = birthDiff === 1 ? t.year : t.years;
            
            if (overlap) {
                // Contemporary (overlap)
                const overlapStart = Math.max(range1.startAM, range2.startAM);
                const overlapEnd = Math.min(range1.endAM, range2.endAM);
                gapYears = overlapEnd - overlapStart;
                color = '#10b981'; // Green
                
                const overlapLabel = currentLanguage === 'es' ? 'superposición' : 'overlap';
                const gapYearText = gapYears === 1 ? t.year : t.years;
                text = `${birthDiff} ${yearText} ${diffLabel} (${gapYears} ${gapYearText} ${overlapLabel})`;
            } else {
                // Gap (non-overlapping)
                let gapStart, gapEnd;
                if (range1.endAM < range2.startAM) {
                    gapStart = range1.endAM;
                    gapEnd = range2.startAM;
                } else {
                    gapStart = range2.endAM;
                    gapEnd = range1.startAM;
                }
                gapYears = gapEnd - gapStart;
                color = '#ef4444'; // Red
                
                const gapLabel = currentLanguage === 'es' ? 'brecha' : 'gap';
                const gapYearText = gapYears === 1 ? t.year : t.years;
                text = `${birthDiff} ${yearText} ${diffLabel} (${gapYears} ${gapYearText} ${gapLabel})`;
            }
            
            const x1 = (startBirth / MAX_AM) * CANVAS_WIDTH;
            const x2 = (endBirth / MAX_AM) * CANVAS_WIDTH;
            
            const bar = document.getElementById('timeline-highlight-bar');
            bar.style.left = `${x1}px`;
            bar.style.width = `${x2 - x1}px`;
            bar.style.backgroundColor = color;
            bar.style.display = 'block';
            
            const label = document.getElementById('timeline-highlight-label');
            label.innerText = text;
            label.style.left = `${x1 + (x2 - x1) / 2}px`;
            label.style.color = color;
            label.style.borderColor = color;
            label.style.display = 'block';
        }
        
        function renderSidebarCard() {
            const cardEl = document.getElementById('timeline-selected-person-card');
            const t = timelineTranslations[currentLanguage];
            
            if (selectedPerson2 === null) {
                const name = selectedPerson1;
                const range = personLifespans[name];
                const pNums = window.UssherNameIndex[name] || [];
                const kingdom = getRulingKingdom(range.startAM, range.endAM);
                const displayName = translateName(name);
                
                cardEl.innerHTML = `
                    <div style="padding: 1rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                        <span style="font-weight:700; font-size:1.1rem; color:var(--color-accent);">${displayName}</span>
                        <button onclick="deselectPerson(1)" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-weight:bold; font-size:0.85rem; padding:0 4px;" title="Deselect ${displayName}">✕</button>
                    </div>
                    <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.75rem;">${range.startAM} A.M. - ${range.endAM} A.M. (${amToBcad(range.startAM)} - ${amToBcad(range.endAM)})</div>
                    <div style="font-size:0.75rem; margin-bottom:0.4rem; display:flex; justify-content:space-between;">
                        <span style="color:var(--text-muted);">${t.rulingKingdom}:</span>
                        <span style="font-weight:600; text-align:right;">${kingdom}</span>
                    </div>
                    <div style="font-size:0.75rem; margin-bottom:0.75rem; display:flex; justify-content:space-between;">
                        <span style="color:var(--text-muted);">${t.mentions}:</span>
                        <span style="font-weight:600;">${pNums.length}</span>
                    </div>
                    <button class="btn btn-primary" onclick="clearAllSelection()" style="padding:0.4rem; font-size:0.75rem; background:none; border:1px solid var(--border-color); color:var(--text-secondary); cursor:pointer; width:100%; border-radius:4px;">${t.clearFilter}</button>
                    </div>
                `;
                
                renderBibleMentions(name);
            } else {
                const name1 = selectedPerson1;
                const name2 = selectedPerson2;
                const range1 = personLifespans[name1];
                const range2 = personLifespans[name2];
                const k1 = getRulingKingdom(range1.startAM, range1.endAM);
                const k2 = getRulingKingdom(range2.startAM, range2.endAM);
                
                const displayName1 = translateName(name1);
                const displayName2 = translateName(name2);
                
                // Gap and overlap math
                let first = name1, second = name2;
                let rFirst = range1, rSecond = range2;
                if (range2.startAM < range1.startAM) {
                    first = name2; second = name1;
                    rFirst = range2; rSecond = range1;
                }
                
                const displaySecond = translateName(second);
                
                const startDiff = rSecond.startAM - rFirst.startAM;
                const endDiff = rSecond.endAM - rFirst.endAM;
                
                let overlapText = "";
                if (rFirst.endAM >= rSecond.startAM) {
                    const overlap = rFirst.endAM - rSecond.startAM;
                    overlapText = `${t.overlappedBy} <strong>${overlap} ${t.years}</strong>.`;
                } else {
                    const gap = rSecond.startAM - rFirst.endAM;
                    overlapText = `${t.inactiveGapOf} <strong>${gap} ${t.years}</strong>.`;
                }
                
                cardEl.innerHTML = `
                    <div style="padding: 1rem;">
                    <div style="font-weight:700; font-size:1rem; color:var(--color-accent); margin-bottom:0.5rem; text-overflow:ellipsis; overflow:hidden;">${displayName1} & ${displayName2}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.75rem;">${t.lifespanDiff}</div>
                    
                    <div style="font-size:0.75rem; display:flex; flex-direction:column; gap:4px; margin-bottom:0.75rem;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span><strong>${displayName1}</strong>: ${range1.startAM} - ${range1.endAM} AM</span>
                            <button onclick="deselectPerson(1)" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-weight:bold; font-size:0.85rem; padding:0 4px;" title="Deselect ${displayName1}">✕</button>
                        </div>
                        <div style="font-size:0.65rem; color:var(--text-muted); margin-bottom:4px; padding-right:20px;">${k1}</div>
                        
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span><strong>${displayName2}</strong>: ${range2.startAM} - ${range2.endAM} AM</span>
                            <button onclick="deselectPerson(2)" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-weight:bold; font-size:0.85rem; padding:0 4px;" title="Deselect ${displayName2}">✕</button>
                        </div>
                        <div style="font-size:0.65rem; color:var(--text-muted); padding-right:20px;">${k2}</div>
                    </div>
                    
                    <div style="background:rgba(255,255,255,0.01); border:1px dashed var(--border-color); border-radius:6px; padding:8px; font-size:0.75rem; margin-bottom:0.75rem;">
                        <div style="font-weight:700; color:var(--color-accent); font-size:0.7rem; text-transform:uppercase; margin-bottom:4px;">${t.gapAnalysis}</div>
                        <div style="margin-bottom:2px;">${t.startDiff}: <strong>${startDiff} ${t.years}</strong> (${displaySecond} ${t.startedLater}).</div>
                        <div style="margin-bottom:2px;">${t.endDiff}: <strong>${endDiff} ${t.years}</strong>.</div>
                        <div>${overlapText}</div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="clearAllSelection()" style="padding:0.4rem; font-size:0.75rem; background:none; border:1px solid var(--border-color); color:var(--text-secondary); cursor:pointer; width:100%; border-radius:4px;">${t.clearFilter}</button>
                    </div>
                `;
                
                // Hide Bible mentions tab in dual view
                document.getElementById('timeline-bible-mentions-section').style.display = 'none';
            }
            cardEl.style.display = 'block';
        }
        
        function renderBibleMentions(name) {
            const listEl = document.getElementById('timeline-bible-mentions-list');
            const container = document.getElementById('timeline-bible-mentions-section');
            const t = timelineTranslations[currentLanguage];
            
            listEl.innerHTML = '';
            
            const mentions = window.UssherBibleMentions[name] || [];
            if (mentions.length === 0) {
                listEl.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">${t.noMentions}</span>`;
            } else {
                // Construct a table
                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
                table.style.fontSize = '0.75rem';
                
                const thead = document.createElement('thead');
                thead.innerHTML = `
                    <tr style="border-bottom: 1px solid var(--border-color); text-align: left; color: var(--text-muted);">
                        <th style="padding: 6px 8px; font-weight: 600;">Ref</th>
                        <th style="padding: 6px 8px; font-weight: 600; text-align: right;">Acción / Action</th>
                    </tr>
                `;
                table.appendChild(thead);
                
                const tbody = document.createElement('tbody');
                mentions.forEach(ref => {
                    const tr = document.createElement('tr');
                    tr.style.borderBottom = '1px solid rgba(255,255,255,0.02)';
                    tr.style.cursor = 'pointer';
                    tr.style.transition = 'all 0.15s ease';
                    
                    // Convert "Book N Ch:V" to human-readable name
                    let displayRef = ref;
                    const bookIdRefMatch = ref.match(/^Book\s+(\d+)\s+(\d+):(\d+)/);
                    if (bookIdRefMatch) {
                        const bMeta = BIBLE_METADATA.find(b => b.id === parseInt(bookIdRefMatch[1]));
                        if (bMeta) {
                            const bName = (currentLanguage === 'es') ? bMeta.name_es : bMeta.name_en;
                            displayRef = `${bName} ${bookIdRefMatch[2]}:${bookIdRefMatch[3]}`;
                        }
                    }
                    
                    tr.innerHTML = `
                        <td style="padding: 8px; font-weight: 600; color: var(--text-primary);">${displayRef}</td>
                        <td style="padding: 8px; text-align: right; color: var(--color-accent); font-weight: bold;">🔎 Preview</td>
                    `;
                    
                    tr.addEventListener('mouseenter', (e) => {
                        tr.style.backgroundColor = 'rgba(245,158,11,0.04)';
                        handleVerseHover(e, ref);
                    });
                    tr.addEventListener('mouseleave', () => {
                        tr.style.backgroundColor = 'transparent';
                        handleVerseMouseLeave(ref);
                    });
                    tr.addEventListener('click', (e) => {
                        handleVerseClick(e, ref);
                    });
                    
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);
                listEl.appendChild(table);
            }
            container.style.display = 'flex';
        }

        let isPopoutSticky = false;
        let activeHoveredRef = null;
        let activeVerseFetch = null;
        let popoutSelectedSpanishVersion = null;
        const originalBibleLoaderLoad = window.bible_loader.load_chapter;

        function fetchVerseText(bookId, chapterNum, verseNum, callback) {
            // Abort pending fetch if any
            if (activeVerseFetch) {
                if (activeVerseFetch.script) {
                    activeVerseFetch.script.remove();
                }
                window.bible_loader.load_chapter = originalBibleLoaderLoad;
                activeVerseFetch = null;
            }
            
            const tempScript = document.createElement('script');
            tempScript.src = `bible_data/chapter_${bookId}_${chapterNum}.js`;
            
            activeVerseFetch = {
                script: tempScript,
                bookId: bookId,
                chapterNum: chapterNum
            };
            
            window.bible_loader.load_chapter = function(bId, cNum, versesData) {
                // Restore original loader
                window.bible_loader.load_chapter = originalBibleLoaderLoad;
                activeVerseFetch = null;
                tempScript.remove();
                
                // Find target verse (versesData is a 0-indexed array, verse 1 = index 0)
                const targetVerse = versesData[parseInt(verseNum) - 1] || null;
                callback(targetVerse);
            };
            
            tempScript.onerror = function() {
                window.bible_loader.load_chapter = originalBibleLoaderLoad;
                activeVerseFetch = null;
                tempScript.remove();
                callback(null);
            };
            
            document.head.appendChild(tempScript);
        }

        function handleVerseHover(e, ref) {
            if (isPopoutSticky) return; // Ignore hover if sticky popout is locked open
            activeHoveredRef = ref;
            showVersePopout(e, ref, false);
        }

        function handleVerseMouseLeave(ref) {
            if (isPopoutSticky) return;
            if (activeHoveredRef === ref) {
                hideVersePopout();
                activeHoveredRef = null;
            }
        }

        function handleVerseClick(e, ref) {
            e.stopPropagation();
            isPopoutSticky = true;
            showVersePopout(e, ref, true);
        }

        window.updatePopoutVerseText = function() {
            const card = document.getElementById('verse-popout-card');
            if (!card || !card.dataset.verseData) return;
            const verseData = JSON.parse(card.dataset.verseData);
            const selectEl = document.getElementById('popout-version-select');
            if (!selectEl) return;
            
            const selectedVer = selectEl.value;
            popoutSelectedSpanishVersion = selectedVer; // Store selection globally
            
            const kjvText = formatVerseText(verseData['KJV'] || '');
            const spText = formatVerseText(verseData[selectedVer] || '');
            
            const spName = selectedVer === 'VP' ? 'RV 1602 Purificada' :
                           selectedVer === 'VG' ? 'RV Gómez' :
                           selectedVer === '09' ? 'RV 1909' :
                           selectedVer === '60' ? 'RV 1960' :
                           selectedVer === '65' ? 'RV 1865' :
                           selectedVer === 'BO' ? 'Biblia del Oso' : 'RV 1960';
            
            const container = document.getElementById('popout-trans-container');
            if (container) {
                container.innerHTML = `
                    <div class="popout-trans-row" style="margin-bottom: 8px;">
                        <div class="popout-trans-label" style="font-weight: 700; color: var(--color-accent); font-size: 0.65rem;">King James Version (KJV)</div>
                        <div class="popout-trans-text">${kjvText}</div>
                    </div>
                    <div class="popout-trans-row">
                        <div class="popout-trans-label" style="font-weight: 700; color: #10b981; font-size: 0.65rem;">Reina Valera (${spName})</div>
                        <div class="popout-trans-text">${spText}</div>
                    </div>
                `;
            }
        };
 
        function showVersePopout(e, ref, isSticky) {
            const card = document.getElementById('verse-popout-card');
            if (!card) return;
            
            const parsed = parseBibleReference(ref);
            if (!parsed) return;
            
            // Set styles based on stickiness
            if (isSticky) {
                card.classList.add('sticky');
            } else {
                card.classList.remove('sticky');
            }
            
            // Position responsive popout (centered modal on mobile, next to sidebar on desktop)
            if (window.innerWidth <= 768) {
                card.style.position = 'fixed';
                card.style.left = '5%';
                card.style.width = '90%';
                card.style.top = '25vh';
                card.style.maxHeight = '50vh';
            } else {
                card.style.position = 'absolute';
                card.style.left = '335px';
                card.style.width = '320px';
                card.style.maxHeight = '250px';
                
                const rect = e.currentTarget.getBoundingClientRect();
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                const topPos = rect.top + scrollY - 20;
                const minTop = scrollY + 10;
                const maxTop = scrollY + window.innerHeight - 270;
                card.style.top = `${Math.min(Math.max(minTop, topPos), maxTop)}px`;
            }
            
            // Display loading
            card.style.display = 'block';
            card.innerHTML = `
                <div class="popout-verse-title">${ref}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">Loading translation preview...</div>
            `;
            
            fetchVerseText(parsed.bookId, parsed.chapter, parsed.verse, function(verseData) {
                // If hover target changed in the meantime (and we aren't sticky), abort!
                if (!isSticky && activeHoveredRef !== ref) return;
                
                if (!verseData) {
                    card.innerHTML = `
                        <div class="popout-verse-title">${ref}</div>
                        <div style="font-size:0.75rem; color:#f87171;">Failed to load verse text.</div>
                    `;
                    return;
                }
                
                // Save verseData to card dataset for dynamic translation changes
                card.dataset.verseData = JSON.stringify(verseData);
                
                let spVersion = popoutSelectedSpanishVersion;
                if (!spVersion) {
                    spVersion = 'VP'; // Default to Valera 1602 Purificada
                    popoutSelectedSpanishVersion = 'VP';
                }
                
                let closeBtnHtml = isSticky ? `<button class="popout-close" onclick="closeVersePopout(event)">✕</button>` : '';
                let linkHtml = isSticky ? `
                     <div style="margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px; text-align:right;">
                         <span style="font-size:0.7rem; color:var(--color-accent); cursor:pointer; font-weight:bold;" onclick="goToVerseFromPopout('${ref}')">Abrir en Lector / Open in Reader →</span>
                     </div>
                ` : '';
                
                card.innerHTML = `
                    ${closeBtnHtml}
                    <div class="popout-verse-title">${ref}</div>
                    
                    <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">
                        <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: bold; text-transform: uppercase;">Versión / Version:</span>
                        <select id="popout-version-select" onchange="updatePopoutVerseText()" style="font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary); cursor: pointer; outline: none;">
                            <option value="60" ${spVersion === '60' ? 'selected' : ''}>RV 1960</option>
                            <option value="VG" ${spVersion === 'VG' ? 'selected' : ''}>RV Gómez</option>
                            <option value="VP" ${spVersion === 'VP' ? 'selected' : ''}>RV 1602 Purificada</option>
                            <option value="09" ${spVersion === '09' ? 'selected' : ''}>RV 1909</option>
                            <option value="65" ${spVersion === '65' ? 'selected' : ''}>RV 1865</option>
                            <option value="BO" ${spVersion === 'BO' ? 'selected' : ''}>Biblia del Oso</option>
                        </select>
                    </div>
                    
                    <div id="popout-trans-container">
                        <!-- Filled by updatePopoutVerseText() -->
                    </div>
                    
                    ${linkHtml}
                `;
                
                // Render text initially
                updatePopoutVerseText();
            });
        }

        function hideVersePopout() {
            if (isPopoutSticky) return;
            const card = document.getElementById('verse-popout-card');
            if (card) {
                card.style.display = 'none';
            }
        }

        function closeVersePopout(e) {
            if (e) e.stopPropagation();
            isPopoutSticky = false;
            activeHoveredRef = null;
            const card = document.getElementById('verse-popout-card');
            if (card) {
                card.style.display = 'none';
            }
        }

        function goToVerseFromPopout(ref) {
            closeVersePopout();
            openLocalBible(ref);
        }

        // Close sticky popout on click outside
        document.addEventListener('click', function(e) {
            if (isPopoutSticky) {
                const card = document.getElementById('verse-popout-card');
                if (card && !card.contains(e.target) && !e.target.closest('#timeline-bible-mentions-list')) {
                    closeVersePopout();
                }
            }
        });
        
        function openLocalBible(ref) {
            const parsed = parseBibleReference(ref);
            if (parsed) {
                // Close timeline overlay
                document.getElementById('timeline-view').style.display = 'none';
                
                // Navigate in reader
                selectedBook = BIBLE_METADATA.find(b => b.id === parsed.bookId);
                loadChapter(parsed.chapter, parsed.verse);
            } else {
                console.warn("Failed to parse Bible reference:", ref);
            }
        }
        
        function parseBibleReference(refStr) {
            // Supports two formats:
            // 1. "Book N Ch:V"  (internal format from UssherBibleMentions)
            // 2. "Genesis 12:1" or "1 Kings 6:1" (name-based format)
            
            // Format 1: "Book N Ch:V"
            const bookIdMatch = refStr.match(/^Book\s+(\d+)\s+(\d+):(\d+)/);
            if (bookIdMatch) {
                return {
                    bookId: parseInt(bookIdMatch[1]),
                    chapter: parseInt(bookIdMatch[2]),
                    verse: parseInt(bookIdMatch[3])
                };
            }
            
            // Format 2: "BookName Ch:V"
            const match = refStr.match(/^(.+?)\s+(\d+):(\d+)(-\d+)?$/);
            if (!match) return null;
            
            const bookName = match[1].trim();
            const chNum = parseInt(match[2]);
            const vNum = parseInt(match[3]);
            
            const book = BIBLE_METADATA.find(b => b.name_en.toLowerCase() === bookName.toLowerCase() || b.name_es.toLowerCase() === bookName.toLowerCase());
            if (!book) return null;
            
            return { bookId: book.id, chapter: chNum, verse: vNum };
        }
        
        function filterParagraphsByPerson(name) {
            const pNums = window.UssherNameIndex[name] || [];
            const list = getUssherParagraphs().filter(p => pNums.includes(parseInt(p.num)));
            
            timelineActiveParagraphs = list;
            timelineLoadedCount = 0;
            
            const feed = document.getElementById('timeline-paragraphs-feed');
            feed.innerHTML = '';
            
            renderBatch();
        }
        
        function resetParagraphsFilter() {
            timelineActiveParagraphs = getUssherParagraphs();
            timelineLoadedCount = 0;
            
            const feed = document.getElementById('timeline-paragraphs-feed');
            feed.innerHTML = '';
            
            renderBatch();
        }
        
        function renderBatch() {
            const feed = document.getElementById('timeline-paragraphs-feed');
            const batchSize = 30;
            const start = timelineLoadedCount;
            const end = Math.min(timelineActiveParagraphs.length, start + batchSize);
            
            if (start >= timelineActiveParagraphs.length) return;
            
            const fragment = document.createDocumentFragment();
            for (let i = start; i < end; i++) {
                const p = timelineActiveParagraphs[i];
                const card = document.createElement('div');
                card.className = 'timeline-para-card';
                card.style.background = 'var(--bg-surface)';
                card.style.border = '1px solid var(--border-color)';
                card.style.borderRadius = '8px';
                card.style.padding = '1rem';
                card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                card.id = `para-${p.num}`;
                
                const amYear = p.yr?.am || '';
                const bcYear = p.yr?.yr || '';
                const er = p.yr?.er || '';
                const yrRep = getYearRepresentation(p.yr);
                
                let isTranslated = false;
                let formattedText = p.text;
                if (currentLanguage === 'es') {
                    const cached = localStorage.getItem('ussher_trans_' + p.num);
                    if (cached) {
                        formattedText = cached;
                        isTranslated = true;
                    }
                }
                
                // Highlight words with * in italics and refs as links
                formattedText = formattedText.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
                
                // Render card HTML
                let refsHtml = '';
                if (p.refs && p.refs.length > 0) {
                    refsHtml = `<div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; align-items:center;">
                        <span style="font-size:0.65rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Refs:</span>`;
                    p.refs.forEach(r => {
                        refsHtml += `<span style="font-size:0.7rem; color:var(--color-accent); cursor:pointer; background:rgba(245,158,11,0.05); padding:2px 6px; border-radius:4px; border:1px solid rgba(245,158,11,0.15);" onclick="openLocalBible('${r}')">${r}</span>`;
                    });
                    refsHtml += `</div>`;
                }
                
                const cardStyle = (currentLanguage === 'es' && !isTranslated) ? 'font-style: italic; opacity: 0.85;' : '';
                
                card.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.02); padding-bottom:0.25rem;">
                        <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">${currentLanguage === 'es' ? 'Párrafo' : 'Para'} ${p.num}</span>
                        <span style="font-size:0.75rem; color:var(--color-accent); font-weight:700;">${yrRep}</span>
                    </div>
                    <p id="para-text-${p.num}" style="font-size:0.85rem; line-height:1.5; color:var(--text-primary); text-align:justify; ${cardStyle}">${formattedText}</p>
                    <div id="para-status-${p.num}"></div>
                    ${refsHtml}
                `;
                fragment.appendChild(card);
                

            }
            
            feed.appendChild(fragment);
            timelineLoadedCount = end;
        }

        const ussherFetching = {};
        const ussherTranslationQueue = [];
        let ussherTranslationRunning = false;
        
        async function processTranslationQueue() {
            if (ussherTranslationRunning || ussherTranslationQueue.length === 0) return;
            ussherTranslationRunning = true;
            const { pNum, englishText } = ussherTranslationQueue.shift();
            await autoTranslateParagraph(pNum, englishText);
            ussherTranslationRunning = false;
            // Process next with small delay to avoid 429
            setTimeout(processTranslationQueue, 600);
        }
        
        function queueTranslation(pNum, englishText) {
            if (localStorage.getItem('ussher_trans_' + pNum)) return; // Already cached
            if (ussherFetching[pNum]) return; // Currently fetching
            if (ussherTranslationQueue.find(q => q.pNum === pNum)) return; // Already in queue
            ussherTranslationQueue.push({ pNum, englishText });
            processTranslationQueue();
        }

        async function autoTranslateParagraph(pNum, englishText) {
            if (localStorage.getItem('ussher_trans_' + pNum)) return;
            if (ussherFetching[pNum]) return;
            
            const apiKey = localStorage.getItem('gemini_api_key');
            const statusEl = document.getElementById(`para-status-${pNum}`);
            const textEl = document.getElementById(`para-text-${pNum}`);
            
            if (!apiKey) {
                if (statusEl) {
                    statusEl.innerHTML = `
                        <div class="translation-warning">
                            <span>Requiere clave API de Gemini. Configúrala en la pestaña de Chat para traducir automáticamente.</span>
                            <button onclick="showChatTabAndPromptKey()">Configurar API Key</button>
                        </div>
                    `;
                }
                return;
            }
            
            ussherFetching[pNum] = true;
            if (statusEl) {
                statusEl.innerHTML = `
                    <div class="translation-loader">
                        <div class="spinner"></div>
                        <span>Traduciendo al Español...</span>
                    </div>
                `;
            }
            
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Translate the following paragraph from James Ussher's "The Annals of the World" into academic, natural Spanish. Keep historical names mapped correctly (e.g. Adam -> Adán, Eve -> Eva, Noah -> Noé, Moses -> Moisés). Keep dates and Bible reference tags in curly braces (e.g. {Ge 1:1}) EXACTLY as they are. Output ONLY the translated Spanish text, without any additional explanations, intros or formatting:\n\n${englishText}`
                            }]
                        }]
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                
                const result = await response.json();
                let translatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
                translatedText = translatedText.trim();
                
                // Strip markdown code fences if returned by model
                if (translatedText.startsWith("```")) {
                    const firstNewline = translatedText.indexOf('\n');
                    if (firstNewline !== -1) {
                        translatedText = translatedText.substring(firstNewline + 1);
                    }
                    if (translatedText.endsWith("```")) {
                        translatedText = translatedText.substring(0, translatedText.length - 3);
                    }
                    translatedText = translatedText.trim();
                }
                
                if (!translatedText) {
                    throw new Error("Empty translation returned");
                }
                
                // Cache translation
                try {
                    localStorage.setItem('ussher_trans_' + pNum, translatedText);
                } catch (e) {
                    console.warn("localStorage quota exceeded, unable to cache translation:", e);
                }
                
                // Update card in DOM if still visible
                const updatedText = translatedText.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
                if (textEl) {
                    textEl.innerHTML = updatedText;
                    textEl.style.fontStyle = 'normal';
                    textEl.style.opacity = '1';
                }
                if (statusEl) {
                    statusEl.innerHTML = '';
                }
            } catch (error) {
                console.error("Translation error:", error);
                if (statusEl) {
                    statusEl.innerHTML = `
                        <div class="translation-warning" style="color: #f87171;">
                            <span>Error al traducir: ${error.message}</span>
                            <button onclick="retryTranslation(${pNum})">Reintentar</button>
                        </div>
                    `;
                }
            } finally {
                delete ussherFetching[pNum];
            }
        }

        function showChatTabAndPromptKey() {
            // Close timeline view
            document.getElementById('timeline-view').style.display = 'none';
            // Open Chat tab
            const tabChatBtn = document.querySelector('[onclick="switchStudyTab(\'chat\')"]');
            if (tabChatBtn) {
                tabChatBtn.click();
            }
            // Expand study panel if not open
            const panel = document.getElementById('study-panel');
            if (panel && !panel.classList.contains('active')) {
                const overlay = document.getElementById('study-overlay');
                if (overlay) overlay.style.display = 'block';
                panel.classList.add('active');
                panel.style.right = '0';
                rightPanelHidden = false;
                showRightPanelCollapseBtn();
                
                const currentWidth = panel.offsetWidth || parseInt(panel.style.width) || 400;
                const mainPanel = document.querySelector('.main-panel');
                if (mainPanel) mainPanel.style.marginRight = `${currentWidth}px`;
            }
            // Focus key input
            showKeySection();
            setTimeout(() => {
                const keyInput = document.getElementById('gemini-api-key');
                if (keyInput) {
                    keyInput.focus();
                    keyInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300);
        }

        function retryTranslation(pNum) {
            const p = getUssherParagraphs().find(para => para.num === pNum);
            if (p) {
                // Use queue to avoid 429 rate-limit errors
                delete ussherFetching[pNum]; // Allow retry even if previously failed
                queueTranslation(pNum, p.text);
            }
        }
        
        function setupInfiniteScroll() {
            const area = document.getElementById('timeline-paragraphs-area');
            const sentinel = document.getElementById('timeline-loading-sentinel');
            sentinel.style.display = 'block';
            
            area.addEventListener('scroll', function() {
                if (area.scrollTop + area.clientHeight >= area.scrollHeight - 100) {
                    renderBatch();
                }
            });
        }
        
        function centerTimelineOnYear(amYear) {
            const section = document.getElementById('global-timeline-section');
            if (!section) return;
            const pct = Math.min(Math.max(0, amYear), MAX_AM) / MAX_AM;
            const targetX = pct * CANVAS_WIDTH;
            section.scrollLeft = targetX - (section.clientWidth / 2);
        }
        
        function centerTimelineOn(name) {
            const range = personLifespans[name];
            if (range) {
                // Center on start year (birth year)
                centerTimelineOnYear(range.startAM);
            }
        }
        
        function handleTimelineJumpYear() {
            const input = document.getElementById('timeline-jump-year-input').value.trim();
            if (!input) return;
            
            let amVal = null;
            // Matches "1000 AM" or "4004 BC" or just "1000"
            const amMatch = input.match(/^(\d+)\s*(am)?$/i);
            const bcMatch = input.match(/^(\d+)\s*bc$/i);
            
            if (amMatch) {
                amVal = parseInt(amMatch[1]);
            } else if (bcMatch) {
                const bcVal = parseInt(bcMatch[1]);
                amVal = 4004 - bcVal; // Ussher chronology standard mapping
            } else {
                amVal = parseInt(input);
            }
            
            if (amVal !== null && !isNaN(amVal)) {
                centerTimelineOnYear(amVal);
            }
        }
        
        function handleTimelineSearchInput() {
            const query = document.getElementById('timeline-search-bar').value.trim();
            const list = document.getElementById('timeline-autocomplete-list');
            list.innerHTML = '';
            
            if (!query || !window.UssherNameIndex) {
                list.style.display = 'none';
                return;
            }
            
            const results = Object.keys(window.UssherNameIndex)
                .filter(name => {
                    const esName = timelineNameMap[name] || "";
                    return name.toLowerCase().includes(query.toLowerCase()) || esName.toLowerCase().includes(query.toLowerCase());
                })
                .slice(0, 8);
                
            if (results.length === 0) {
                list.style.display = 'none';
                return;
            }
            
            results.forEach(name => {
                const div = document.createElement('div');
                div.className = 'autocomplete-item';
                div.style.padding = '8px 12px';
                div.style.cursor = 'pointer';
                div.style.borderBottom = '1px solid var(--border-muted)';
                const displayName = translateName(name);
                div.innerText = displayName;
                
                div.addEventListener('click', () => {
                    document.getElementById('timeline-search-bar').value = displayName;
                    list.style.display = 'none';
                    selectSearchedName(name);
                });
                list.appendChild(div);
            });
            list.style.display = 'block';
        }
        
        function handleTimelineSearchKeydown(e) {
            if (e.key === 'Enter') {
                const query = document.getElementById('timeline-search-bar').value.trim();
                if (query) {
                    // Try exact match or first autocomplete item
                    const names = Object.keys(window.UssherNameIndex);
                    const exact = names.find(n => {
                        const esName = timelineNameMap[n] || "";
                        return n.toLowerCase() === query.toLowerCase() || esName.toLowerCase() === query.toLowerCase();
                    });
                    if (exact) {
                        selectSearchedName(exact);
                        document.getElementById('timeline-search-bar').value = translateName(exact);
                    } else {
                        const partial = names.find(n => {
                            const esName = timelineNameMap[n] || "";
                            return n.toLowerCase().includes(query.toLowerCase()) || esName.toLowerCase().includes(query.toLowerCase());
                        });
                        if (partial) {
                            selectSearchedName(partial);
                            document.getElementById('timeline-search-bar').value = translateName(partial);
                        }
                    }
                    document.getElementById('timeline-autocomplete-list').style.display = 'none';
                }
            }
        }
        
        function clearTimelineSearch() {
            document.getElementById('timeline-search-bar').value = '';
            document.getElementById('timeline-autocomplete-list').style.display = 'none';
            clearAllSelection();
        }
        
        function selectSearchedName(name) {
            // If the name is NOT in personLifespans, dynamically compute its active range!
            if (!personLifespans[name]) {
                const pNums = window.UssherNameIndex[name] || [];
                const range = calculateActiveRange(pNums);
                if (range) {
                    personLifespans[name] = range;
                    // Rebuild structures with new temporary card
                    buildTimelineStructure();
                }
            }
            
            if (personLifespans[name]) {
                selectPrimary(name);
                centerTimelineOn(name);
            }
        }
        
        function calculateActiveRange(pNums) {
            const years = [];
            pNums.forEach(pNum => {
                const p = getUssherParagraphs().find(para => parseInt(para.num) === pNum);
                if (p && p.yr && p.yr.am) {
                    const amVal = parseInt(p.yr.am);
                    if (!isNaN(amVal)) {
                        years.push(amVal);
                    }
                }
            });
            if (years.length === 0) return null;
            years.sort((a, b) => a - b);
            
            if (years.length <= 3) {
                return { startAM: years[0], endAM: years[years.length - 1] };
            }
            
            // 85% Density active range calculator to filter retrospective outliers
            const pct = 0.85;
            const count = Math.max(2, Math.ceil(years.length * pct));
            let minSpan = Infinity;
            let bestStart = years[0];
            let bestEnd = years[years.length - 1];
            
            for (let i = 0; i <= years.length - count; i++) {
                const start = years[i];
                const end = years[i + count - 1];
                const span = end - start;
                if (span < minSpan) {
                    minSpan = span;
                    bestStart = start;
                    bestEnd = end;
                }
            }
            
            return { startAM: bestStart, endAM: bestEnd };
        }
        
        function amToBcad(amYear) {
            const bcVal = 4004 - amYear;
            if (bcVal >= 0) {
                return `${bcVal} ${currentLanguage === 'es' ? 'a.C.' : 'BC'}`;
            } else {
                return `${Math.abs(bcVal)} ${currentLanguage === 'es' ? 'd.C.' : 'AD'}`;
            }
        }
        
        function getYearRepresentation(yr) {
            if (!yr) return '';
            const am = yr.am || '';
            const bc = yr.yr || '';
            const er = yr.er || 'BC';
            
            const amSuffix = currentLanguage === 'es' ? 'A.M.' : 'AM';
            const bcSuffix = currentLanguage === 'es' ? (er === 'BC' ? 'a.C.' : 'd.C.') : er;
            
            return `${am} ${amSuffix} (${bc} ${bcSuffix})`;
        }
        
        function getRulingKingdom(startAM, endAM) {
            const mid = (startAM + endAM) / 2;
            if (currentLanguage === 'es') {
                if (mid <= 2513) return "Era Patriarcal (Egipto / Canaán)";
                if (mid <= 2908) return "Era de los Jueces (Israel)";
                if (mid <= 3029) return "Reino Unido de Israel";
                if (mid <= 3283) return "Reino Dividido (Judá / Israel)";
                if (mid <= 3416) return "Reino de Judá (Sur)";
                if (mid <= 3466) return "Imperio Babilonio";
                if (mid <= 3674) return "Imperio Persa";
                if (mid <= 3937) return "Imperio Griego";
                return "Imperio Romano";
            } else {
                if (mid <= 2513) return "Patriarchal Era (Egypt / Canaan)";
                if (mid <= 2908) return "Era of the Judges (Israel)";
                if (mid <= 3029) return "United Kingdom of Israel";
                if (mid <= 3283) return "Divided Kingdom (Judah / Israel)";
                if (mid <= 3416) return "Kingdom of Judah (Southern)";
                if (mid <= 3466) return "Babylonian Empire";
                if (mid <= 3674) return "Persian Empire";
                if (mid <= 3937) return "Grecian Empire";
                return "Roman Empire";
            }
        }
        
        function escapeId(str) {
            return str.replace(/[^a-zA-Z0-9-_]/g, '_');
        }

        function makeCardDraggable(card, node) {
            let startX = 0, startY = 0;
            let currentLeft = 0, currentTop = 0;
            const birthX = (node.range.startAM / MAX_AM) * CANVAS_WIDTH;
            const initialY = trackYOffsets[node.track];
            
            // Check if card has previously saved offsets
            if (node.customLeft !== undefined && node.customTop !== undefined) {
                currentLeft = node.customLeft;
                currentTop = node.customTop;
                card.style.left = `${currentLeft}px`;
                card.style.top = `${currentTop}px`;
                updateConnectorLine(node.name, currentLeft, currentTop, initialY);
            } else {
                currentLeft = birthX;
                currentTop = initialY;
            }
            
            let isDragging = false;
            let dragMoved = false;
            let ctrlPressed = false;
            let touchStartX = 0;
            let touchStartY = 0;
            let touchMoved = false;
            let longPressTimer = null;
            let longPressTriggered = false;
            let originalDragStartX = 0;
            let originalDragStartY = 0;
            
            card.addEventListener('mousedown', mouseDragStart);
            card.addEventListener('touchstart', touchDragStart, { passive: false });
            
            function mouseDragStart(e) {
                if (e.button !== 0) return; // Only left click
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
                
                e.stopPropagation();
                
                startX = e.clientX;
                startY = e.clientY;
                originalDragStartX = e.clientX;
                originalDragStartY = e.clientY;
                dragMoved = false;
                ctrlPressed = e.ctrlKey || e.metaKey;
                
                document.addEventListener('mousemove', mouseDragMove);
                document.addEventListener('mouseup', mouseDragEnd);
            }
            
            function mouseDragMove(e) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                
                const totalDist = Math.hypot(e.clientX - originalDragStartX, e.clientY - originalDragStartY);
                if (totalDist > 5) {
                    if (!isDragging) {
                        isDragging = true;
                        dragMoved = true;
                        card.classList.add('dragging');
                        card.style.cursor = 'grabbing';
                    }
                }
                
                if (isDragging) {
                    startX = e.clientX;
                    startY = e.clientY;
                    
                    currentLeft = parseFloat(card.style.left) + dx;
                    currentTop = parseFloat(card.style.top) + dy;
                    
                    card.style.left = `${currentLeft}px`;
                    card.style.top = `${currentTop}px`;
                    
                    node.customLeft = currentLeft;
                    node.customTop = currentTop;
                    
                    updateConnectorLine(node.name, currentLeft, currentTop, initialY);
                }
            }
            
            function mouseDragEnd(e) {
                document.removeEventListener('mousemove', mouseDragMove);
                document.removeEventListener('mouseup', mouseDragEnd);
                
                if (isDragging) {
                    isDragging = false;
                    card.classList.remove('dragging');
                    card.style.cursor = 'grab';
                } else if (!dragMoved) {
                    // It was a click!
                    handleTimelineCardClick(node.name, ctrlPressed);
                }
            }
            
            function touchDragStart(e) {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
                
                e.stopPropagation();
                
                const touch = e.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                
                touchMoved = false;
                longPressTriggered = false;
                isDragging = false;
                
                // Start long press timer (2000ms = 2 seconds)
                longPressTimer = setTimeout(() => {
                    longPressTriggered = true;
                    if (navigator.vibrate) {
                        navigator.vibrate(80); // brief haptic vibe
                    }
                    handleTimelineCardClick(node.name, true); // Compare on long press
                }, 2000);
                
                document.addEventListener('touchmove', touchDragMove, { passive: false });
                document.addEventListener('touchend', touchDragEnd);
            }
            
            function touchDragMove(e) {
                const touch = e.touches[0];
                const dx = touch.clientX - startX;
                const dy = touch.clientY - startY;
                
                const totalDist = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
                if (totalDist > 8) {
                    touchMoved = true;
                    clearTimeout(longPressTimer); // Cancel long press if moving
                    
                    if (!isDragging) {
                        isDragging = true;
                        card.classList.add('dragging');
                    }
                }
                
                if (isDragging) {
                    e.preventDefault(); // Prevent page scroll when dragging card
                    
                    startX = touch.clientX;
                    startY = touch.clientY;
                    
                    currentLeft = parseFloat(card.style.left) + dx;
                    currentTop = parseFloat(card.style.top) + dy;
                    
                    card.style.left = `${currentLeft}px`;
                    card.style.top = `${currentTop}px`;
                    
                    node.customLeft = currentLeft;
                    node.customTop = currentTop;
                    
                    updateConnectorLine(node.name, currentLeft, currentTop, initialY);
                }
            }
            
            function touchDragEnd(e) {
                document.removeEventListener('touchmove', touchDragMove);
                document.removeEventListener('touchend', touchDragEnd);
                
                clearTimeout(longPressTimer);
                
                if (isDragging) {
                    isDragging = false;
                    card.classList.remove('dragging');
                } else if (!touchMoved && !longPressTriggered) {
                    // Short tap - regular single-select
                    handleTimelineCardClick(node.name, false);
                }
            }
        }
        
        function updateConnectorLine(name, left, top, initialY) {
            const line = document.getElementById(`line-${escapeId(name)}`);
            if (!line) return;
            
            const card = document.getElementById(`node-${escapeId(name)}`);
            const cardHeight = card ? card.offsetHeight : 52;
            
            // Connect to bottom of card if above axis, else connect to top of card
            const y1 = (top < AXIS_Y) ? (top + cardHeight) : top;
            
            line.setAttribute('x1', left);
            line.setAttribute('y1', y1);
        }
        
        function updateTimeline() {
            buildTimelineStructure();
            renderLineTimeline();
        }
        
        // Hide autocomplete on click outside
        document.addEventListener('click', function(e) {
            const list = document.getElementById('timeline-autocomplete-list');
            if (list && e.target.id !== 'timeline-search-bar') {
                list.style.display = 'none';
            }
        });
        
        // Hook translation update in main app to timeline languages
        const originalApplyLanguage = applyLanguage;
        applyLanguage = function() {
            originalApplyLanguage();
            // Translate the speech live-voice toggle
            const liveVoiceSpan = document.querySelector('[data-translate="live_voice"]');
            if (liveVoiceSpan) {
                liveVoiceSpan.innerText = currentLanguage === 'es' ? 'Voz en vivo' : 'Live Voice Chat';
            }
        };
        
        // ==========================================

        // Scroll to and highlight a target verse
        function scrollToVerse(verseNum) {
            const target = document.getElementById(`v-${verseNum}`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // If it is an inline verse number, highlight it temporarily
                if (target.classList.contains('verse-inline-num')) {
                    target.style.color = 'var(--text-primary)';
                    target.style.fontSize = '1.1rem';
                    setTimeout(() => {
                        target.style.color = 'var(--color-accent)';
                        target.style.fontSize = '0.75rem';
                    }, 2000);
                } else {
                    target.style.borderColor = 'var(--color-accent)';
                    setTimeout(() => {
                        target.style.borderColor = 'var(--border-color)';
                    }, 2000);
                }
            }
        }

        // --- 4. How to Use Help Modal Slides Carousel Logic ---
        let currentHelpSlideIndex = 0;
        const totalHelpSlides = 5;

        const helpSlidesContent = {
            'en': {
                slides: [
                    {
                        title: "Parallel Bible Study",
                        text: "Welcome to the premium Parallel Bible Study App! This tool enables multi-version side-by-side study, cross-commentaries, interactive timelines, and voice chatbot assistance.",
                        list: [
                            "View versions side-by-side.",
                            "Toggle commentary on active verses.",
                            "Talk hands-free with the study chatbot."
                        ]
                    },
                    {
                        title: "Layout & Customization",
                        text: "Customize the interface to suit your preference:",
                        list: [
                            "Reorder versions by dragging the reorder handles up/down.",
                            "Set custom text size and font scale.",
                            "Change theme background, card surface, text, and header button accent colors."
                        ]
                    },
                    {
                        title: "Read-Aloud (TTS)",
                        text: "Listen to the Bible text using speech synthesis:",
                        list: [
                            "Highlight any portion of text in the reader to prompt a quick 'Read from here' bubble.",
                            "The app automatically detects the selected version's language (Spanish or English) and matches the correct accent.",
                            "Verse numbers and paragraph markers are skipped in speech to keep it natural."
                        ]
                    },
                    {
                        title: "Chronology Timeline",
                        text: "Explore the biblical lifespans from Ussher's Annals of the World:",
                        list: [
                            "Drag figure cards vertical positions to resolve overlaps while maintaining connector line anchors.",
                            "Click two figures to compare gaps, lifespans, and overlap years.",
                            "Hover or click references under Bible Mentions to instantly preview verse translations in KJV and Spanish."
                        ]
                    },
                    {
                        title: "Hands-Free Chat & Mic Setup",
                        text: "Keep the voice chat microphone active for a hands-free conversation:",
                        list: [
                            "Enable 'Live Voice Chat' in the sidebar to talk with the AI assistant.",
                            "<strong>Important</strong>: Modern browsers require a secure HTTP origin to persist mic permission. Run the app locally via a command prompt using: <code>python -m http.server</code> and open <code>http://localhost:8000</code>."
                        ]
                    }
                ],
                prev: "Prev",
                next: "Next",
                close: "Close"
            },
            'es': {
                slides: [
                    {
                        title: "Estudio Bíblico Paralelo",
                        text: "¡Bienvenido a la aplicación premium de Estudio Bíblico Paralelo! Esta herramienta permite el estudio de múltiples versiones cara a cara, comentarios cruzados, líneas de tiempo interactivas y asistencia de chatbot de voz.",
                        list: [
                            "Vea versiones de la Biblia una al lado de la otra.",
                            "Active comentarios para los versículos activos.",
                            "Hable a manos libres con el chatbot de estudio."
                        ]
                    },
                    {
                        title: "Diseño y Personalización",
                        text: "Personalice la interfaz de acuerdo con sus preferencias:",
                        list: [
                            "Reordene las versiones arrastrando las manijas de reordenación hacia arriba/abajo.",
                            "Establezca el tamaño de texto personalizado y la escala de la fuente.",
                            "Cambie los colores del fondo del tema, tarjetas, texto y el acento de botones del encabezado."
                        ]
                    },
                    {
                        title: "Lectura en Voz Alta (TTS)",
                        text: "Escuche el texto bíblico mediante síntesis de voz:",
                        list: [
                            "Resalte cualquier parte del texto en el lector para activar una burbuja rápida 'Leer desde aquí'.",
                            "La aplicación detecta automáticamente el idioma de la versión seleccionada (español o inglés) y aplica el acento correcto.",
                            "Los números de versículos y marcadores de párrafos se omiten en la lectura para que suene natural."
                        ]
                    },
                    {
                        title: "Línea de Tiempo Cronológica",
                        text: "Explore los ciclos de vida bíblicos de los Anales del Mundo de Ussher:",
                        list: [
                            "Arrastre las tarjetas de personajes verticalmente para resolver solapamientos manteniendo los anclajes de las líneas conectoras.",
                            "Haga clic en dos personajes para comparar brechas, ciclos de vida y años de solapamiento.",
                            "Pase el cursor o haga clic en las referencias bajo Menciones Bíblicas para previsualizar instantáneamente las traducciones del versículo en KJV y español."
                        ]
                    },
                    {
                        title: "Chat Manos Libres y Micrófono",
                        text: "Mantenga activo el micrófono de chat de voz para una conversación manos libres:",
                        list: [
                            "Active 'Chat de voz en vivo' en la barra lateral para hablar con el asistente de IA.",
                            "<strong>Importante</strong>: Los navegadores modernos requieren un origen HTTP seguro para mantener el permiso del micrófono. Ejecute la aplicación localmente usando: <code>python -m http.server</code> y abra <code>http://localhost:8000</code>."
                        ]
                    }
                ],
                prev: "Anterior",
                next: "Siguiente",
                close: "Cerrar"
            }
        };

        function openHelpModal() {
            updateHelpModalContent();
            document.getElementById('help-modal').style.display = 'flex';
            currentHelpSlideIndex = 0;
            showHelpSlide(0);
        }

        function closeHelpModal() {
            document.getElementById('help-modal').style.display = 'none';
        }

        function closeHelpModalOnOuterClick(e) {
            if (e.target.id === 'help-modal') {
                closeHelpModal();
            }
        }

        function updateHelpModalContent() {
            const lang = currentLanguage === 'es' ? 'es' : 'en';
            const data = helpSlidesContent[lang];
            
            // Populate slides
            for (let i = 0; i < totalHelpSlides; i++) {
                const slide = data.slides[i];
                const titleEl = document.getElementById(`slide-title-${i+1}`);
                const textEl = document.getElementById(`slide-text-${i+1}`);
                const listEl = document.getElementById(`slide-list-${i+1}`);
                
                if (titleEl) titleEl.innerText = slide.title;
                if (textEl) textEl.innerHTML = slide.text;
                if (listEl) {
                    listEl.innerHTML = '';
                    slide.list.forEach(item => {
                        const li = document.createElement('li');
                        li.innerHTML = item;
                        listEl.appendChild(li);
                    });
                }
            }
            
            // Buttons translation
            const prevBtn = document.getElementById('help-prev-btn');
            const nextBtn = document.getElementById('help-next-btn');
            if (prevBtn) prevBtn.innerText = data.prev;
            if (nextBtn) nextBtn.innerText = currentHelpSlideIndex === totalHelpSlides - 1 ? data.close : data.next;
            
            // Rebuild dots
            const dotsContainer = document.getElementById('help-carousel-dots');
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalHelpSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = `help-dot ${i === currentHelpSlideIndex ? 'active' : ''}`;
                    dot.addEventListener('click', () => {
                        showHelpSlide(i);
                    });
                    dotsContainer.appendChild(dot);
                }
            }
        }

        function showHelpSlide(index) {
            currentHelpSlideIndex = index;
            const track = document.getElementById('help-carousel-track');
            if (track) {
                track.style.transform = `translateX(-${index * 100}%)`;
            }
            
            // Update dots active state
            const dots = document.querySelectorAll('.help-dot');
            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Update buttons text
            const lang = currentLanguage === 'es' ? 'es' : 'en';
            const data = helpSlidesContent[lang];
            
            const prevBtn = document.getElementById('help-prev-btn');
            const nextBtn = document.getElementById('help-next-btn');
            
            if (prevBtn) {
                prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
            }
            if (nextBtn) {
                nextBtn.innerText = index === totalHelpSlides - 1 ? data.close : data.next;
            }
        }

        function nextHelpSlide() {
            if (currentHelpSlideIndex < totalHelpSlides - 1) {
                showHelpSlide(currentHelpSlideIndex + 1);
            } else {
                closeHelpModal();
            }
        }

        // ==========================================
        // --- 5. Biblical Kahoot-Style Quiz Game ---
        // ==========================================
        let quizState = {
            role: 'host', // 'host' or 'client'
            mode: 'single', // 'single' or 'multi'
            roomCode: '',
            clientId: (() => {
                let id = localStorage.getItem('quiz_client_id');
                if (!id) {
                    id = 'client_' + Math.random().toString(36).substring(2, 10);
                    localStorage.setItem('quiz_client_id', id);
                }
                return id;
            })(),
            nickname: '',
            client: null, // MQTT Client
            questions: [],
            currentQIdx: -1,
            players: [], // { name, clientId, score, lastCorrect, lastScore, lastAnswerIdx }
            answersReceived: {}, // clientId -> { answerIdx, timeTaken }
            timerVal: 20,
            timerInterval: null,
            quizLanguage: 'en',
            selectedBookId: 1,
            selectedVersion: 'KJV'
        };

        const QuizTranslations = {
            'en': {
                quiz_setup_title: 'Bible Quiz Game',
                quiz_setup_subtitle: 'Create a Kahoot-style quiz from the scriptures',
                quiz_label_book: 'Select Book:',
                quiz_label_from_chapter: 'From Chapter:',
                quiz_label_from_verse: 'From Verse:',
                quiz_label_to_chapter: 'To Chapter:',
                quiz_label_to_verse: 'To Verse:',
                quiz_label_version: 'Bible Version for Quiz:',
                quiz_label_mode: 'Game Mode:',
                quiz_mode_single: 'Single Player',
                quiz_mode_multi: 'Multiplayer Lobby',
                quiz_label_host_name: 'Your Host Name:',
                quiz_btn_create: 'Generate Quiz',
                quiz_lobby_title: 'Waiting Lobby',
                quiz_lobby_room_code: 'ROOM CODE:',
                quiz_lobby_players: 'Players',
                quiz_btn_start: 'Start Game',
                quiz_join_title: 'Join Bible Quiz',
                quiz_join_subtitle: 'Enter your name to connect to Room',
                quiz_label_player_name: 'Your Name:',
                quiz_btn_join: 'Join Game',
                quiz_client_waiting_title: 'You are in!',
                quiz_client_waiting_subtitle: 'Waiting for the host to start the game...',
                quiz_btn_skip: 'Skip',
                quiz_results_title: 'Results',
                quiz_label_correct_ans: 'CORRECT ANSWER:',
                quiz_label_responses: 'Responses:',
                quiz_label_leaderboard: 'Leaderboard',
                quiz_btn_next: 'Next',
                quiz_end_title: '🏆 Game Over! 🏆',
                quiz_btn_exit: 'Exit',
                msg_connecting: 'Connecting to multiplayer server...',
                msg_generating: 'Generating quiz questions using Gemini...',
                msg_fetching_verses: 'Loading scripture texts...',
                msg_no_key: 'Gemini API key is missing. Please configure your key in the Chat tab.',
                msg_invalid_range: 'Invalid range selected. Start verse must be before end verse.',
                msg_empty_name: 'Please enter a player name.',
                msg_duplicate_name: 'Nickname already taken. Choose another.',
                msg_answering: 'Look at the host screen for the question!',
                msg_correct: 'Correct!',
                msg_incorrect: 'Incorrect',
                quiz_client_waiting_title_prep: 'Prepare',
                quiz_client_waiting_subtitle_prep: 'Look at the host screen for the question!',
                quiz_client_joined_as: 'Joined as:',
                random_game_title: 'Random Verse Lookup',
                random_game_subtitle: 'Find the verse in your physical Bible, then click or hover to reveal and verify!',
                random_game_label_version: 'Select Bible Version:',
                random_game_btn_draw: 'Draw Random Verse',
                random_game_btn_reveal: 'Click or Hover to Reveal',
                random_game_btn_next: 'Next Verse 🎲',
                random_game_reveal_prompt: 'Click or Hover to Reveal Content',
                random_game_loading: 'Selecting random verse...'
            },
            'es': {
                quiz_setup_title: 'Cuestionario Bíblico',
                quiz_setup_subtitle: 'Crea una trivia tipo Kahoot basada en las Escrituras',
                quiz_label_book: 'Seleccionar Libro:',
                quiz_label_from_chapter: 'Desde el Capítulo:',
                quiz_label_from_verse: 'Desde el Versículo:',
                quiz_label_to_chapter: 'Hasta el Capítulo:',
                quiz_label_to_verse: 'Hasta el Versículo:',
                quiz_label_version: 'Versión de la Biblia para Cuestionario:',
                quiz_label_mode: 'Modo de Juego:',
                quiz_mode_single: 'Un Solo Jugador',
                quiz_mode_multi: 'Lobby Multijugador',
                quiz_label_host_name: 'Su Nombre de Anfitrión:',
                quiz_btn_create: 'Generar Cuestionario',
                quiz_lobby_title: 'Sala de Espera',
                quiz_lobby_room_code: 'CÓDIGO DE SALA:',
                quiz_lobby_players: 'Jugadores',
                quiz_btn_start: 'Iniciar Juego',
                quiz_join_title: 'Unirse al Cuestionario',
                quiz_join_subtitle: 'Ingrese su nombre para conectarse a la Sala',
                quiz_label_player_name: 'Su Nombre:',
                quiz_btn_join: 'Unirse al Juego',
                quiz_client_waiting_title: '¡Estás dentro!',
                quiz_client_waiting_subtitle: 'Esperando a que el anfitrión inicie el juego...',
                quiz_btn_skip: 'Omitir',
                quiz_results_title: 'Resultados',
                quiz_label_correct_ans: 'RESPUESTA CORRECTA:',
                quiz_label_responses: 'Respuestas:',
                quiz_label_leaderboard: 'Tabla de Posiciones',
                quiz_btn_next: 'Siguiente',
                quiz_end_title: '🏆 ¡Juego Terminado! 🏆',
                quiz_btn_exit: 'Salir',
                msg_connecting: 'Conectando al servidor multijugador...',
                msg_generating: 'Generando preguntas del cuestionario usando Gemini...',
                msg_fetching_verses: 'Cargando textos de las Escrituras...',
                msg_no_key: 'Falta la clave API de Gemini. Configúrala en la pestaña de Chat.',
                msg_invalid_range: 'Rango seleccionado no válido. El inicio debe ser antes del fin.',
                msg_empty_name: 'Por favor ingrese un nombre de jugador.',
                msg_duplicate_name: 'Ese nombre ya está en uso. Elija otro.',
                msg_answering: '¡Mire la pantalla del anfitrión para ver la pregunta!',
                msg_correct: '¡Correcto!',
                msg_incorrect: 'Incorrecto',
                quiz_client_waiting_title_prep: 'Prepárate',
                quiz_client_waiting_subtitle_prep: '¡Mira la pantalla del anfitrión para ver la pregunta!',
                quiz_client_joined_as: 'Unido como:',
                random_game_title: 'Búsqueda de Versículo Aleatorio',
                random_game_subtitle: 'Busque el versículo en su Biblia física, luego haga clic o pase el mouse para revelar y verificar.',
                random_game_label_version: 'Seleccionar Versión de la Biblia:',
                random_game_btn_draw: 'Obtener Versículo Aleatorio',
                random_game_btn_reveal: 'Clic o Hover para Revelar',
                random_game_btn_next: 'Siguiente Versículo 🎲',
                random_game_reveal_prompt: 'Haga clic o pase el mouse para revelar el contenido',
                random_game_loading: 'Seleccionando versículo aleatorio...'
            }
        };

        function resetQuizState() {
            if (quizState.client) {
                try { quizState.client.end(); } catch (e) {}
            }
            clearInterval(quizState.timerInterval);
            
            quizState = {
                role: 'host',
                mode: 'single',
                roomCode: '',
                clientId: 'client_' + Math.random().toString(36).substring(2, 10),
                nickname: '',
                client: null,
                questions: [],
                currentQIdx: -1,
                players: [],
                answersReceived: {},
                timerVal: 20,
                timerInterval: null,
                quizLanguage: 'en',
                selectedBookId: 1,
                selectedVersion: 'KJV'
            };
        }

        function populateQuizBooks() {
            const bookSel = document.getElementById('quiz-select-book');
            const currentVal = bookSel.value;
            bookSel.innerHTML = '';
            BIBLE_METADATA.forEach(b => {
                const opt = document.createElement('option');
                opt.value = b.id;
                opt.innerText = (quizState.quizLanguage === 'es') ? b.name_es : b.name_en;
                if (currentVal && b.id === parseInt(currentVal)) {
                    opt.selected = true;
                } else if (!currentVal && selectedBook && b.id === selectedBook.id) {
                    opt.selected = true;
                }
                bookSel.appendChild(opt);
            });
        }

        function openQuizModal() {
            stopTTS();
            
            // Show modal overlay
            const modal = document.getElementById('quiz-modal');
            modal.style.display = 'flex';
            
            resetQuizState();
            
            // Populate Version Selector
            const versionSel = document.getElementById('quiz-select-version');
            versionSel.innerHTML = '';
            const versionsList = [
                { id: 'KJV', name: 'King James Version' },
                { id: '60', name: 'Reina Valera 1960' },
                { id: '65', name: 'Reina Valera 1865' },
                { id: '09', name: 'Reina Valera 1909' },
                { id: 'VG', name: 'Reina Valera Gómez' },
                { id: 'VP', name: 'Reina Valera 1602 Purificada' },
                { id: 'BO', name: 'Biblia del Oso 1569' }
            ];
            
            versionsList.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.id;
                opt.innerText = v.name;
                if (typeof singleFocusVersion !== 'undefined' && v.id === singleFocusVersion) {
                    opt.selected = true;
                } else if (v.id === 'KJV') {
                    opt.selected = true;
                }
                versionSel.appendChild(opt);
            });
            
            onQuizVersionChanged();
            onQuizBookChanged();
            showQuizView('setup');
        }

        function closeQuizModal() {
            document.getElementById('quiz-modal').style.display = 'none';
            resetQuizState();
            const url = new URL(window.location);
            if (url.searchParams.has('room')) {
                url.searchParams.delete('room');
                url.searchParams.delete('role');
                window.history.replaceState({}, document.title, url.pathname);
            }
        }

        function closeQuizModalOnOuterClick(e) {
            if (e.target.id === 'quiz-modal') {
                closeQuizModal();
            }
        }

        function showQuizView(viewName) {
            document.querySelectorAll('#quiz-modal .quiz-view').forEach(v => v.style.display = 'none');
            const view = document.getElementById(`quiz-view-${viewName}`);
            if (view) {
                if (viewName === 'player-controller') {
                    view.style.display = 'block';
                } else {
                    view.style.display = 'flex';
                    view.style.flexDirection = 'column';
                }
            }
        }

        function setQuizGameMode(mode) {
            quizState.mode = mode;
            const btnSingle = document.getElementById('quiz-mode-single');
            const btnMulti = document.getElementById('quiz-mode-multi');
            const hostNameGroup = document.getElementById('quiz-setup-host-name-group');
            
            if (mode === 'single') {
                btnSingle.classList.add('active');
                btnSingle.style.background = 'var(--color-accent)';
                btnSingle.style.color = 'var(--bg-base)';
                btnMulti.classList.remove('active');
                btnMulti.style.background = 'rgba(255,255,255,0.02)';
                btnMulti.style.color = 'var(--text-primary)';
                hostNameGroup.style.display = 'none';
            } else {
                btnMulti.classList.add('active');
                btnMulti.style.background = 'var(--color-accent)';
                btnMulti.style.color = 'var(--bg-base)';
                btnSingle.classList.remove('active');
                btnSingle.style.background = 'rgba(255,255,255,0.02)';
                btnSingle.style.color = 'var(--text-primary)';
                hostNameGroup.style.display = 'block';
            }
        }

        function onQuizBookChanged() {
            const bookId = parseInt(document.getElementById('quiz-select-book').value);
            const book = BIBLE_METADATA.find(b => b.id === bookId);
            if (!book) return;
            
            const fromChSel = document.getElementById('quiz-select-from-ch');
            const toChSel = document.getElementById('quiz-select-to-ch');
            
            fromChSel.innerHTML = '';
            toChSel.innerHTML = '';
            
            for (let c = 1; c <= book.chapters; c++) {
                const opt1 = document.createElement('option');
                opt1.value = c;
                opt1.innerText = c;
                if (selectedChapter && c === selectedChapter) {
                    opt1.selected = true;
                }
                fromChSel.appendChild(opt1);
                
                const opt2 = document.createElement('option');
                opt2.value = c;
                opt2.innerText = c;
                if (selectedChapter && c === selectedChapter) {
                    opt2.selected = true;
                }
                toChSel.appendChild(opt2);
            }
            
            onQuizFromChapterChanged();
            onQuizToChapterChanged();
        }

        function fetchChapterVerseCount(bookId, chNum, callback) {
            const originalLoad = window.bible_loader.load_chapter;
            window.bible_loader.load_chapter = function(bId, cNum, versesData) {
                window.bible_loader.load_chapter = originalLoad;
                const vCount = Object.keys(versesData).length;
                callback(vCount);
            };
            const script = document.createElement('script');
            script.src = `bible_data/chapter_${bookId}_${chNum}.js`;
            script.onload = function() {
                if (script.parentNode) script.parentNode.removeChild(script);
            };
            script.onerror = function() {
                if (script.parentNode) script.parentNode.removeChild(script);
                window.bible_loader.load_chapter = originalLoad;
                callback(0);
            };
            document.head.appendChild(script);
        }

        function onQuizFromChapterChanged() {
            const bookId = parseInt(document.getElementById('quiz-select-book').value);
            const fromCh = parseInt(document.getElementById('quiz-select-from-ch').value);
            const fromVsSel = document.getElementById('quiz-select-from-vs');
            
            fromVsSel.innerHTML = '<option value="1">1</option>';
            
            fetchChapterVerseCount(bookId, fromCh, function(vCount) {
                fromVsSel.innerHTML = '';
                for (let v = 1; v <= vCount; v++) {
                    const opt = document.createElement('option');
                    opt.value = v;
                    opt.innerText = v;
                    fromVsSel.appendChild(opt);
                }
            });
        }

        function onQuizToChapterChanged() {
            const bookId = parseInt(document.getElementById('quiz-select-book').value);
            const toCh = parseInt(document.getElementById('quiz-select-to-ch').value);
            const toVsSel = document.getElementById('quiz-select-to-vs');
            
            toVsSel.innerHTML = '<option value="1">1</option>';
            
            fetchChapterVerseCount(bookId, toCh, function(vCount) {
                toVsSel.innerHTML = '';
                for (let v = 1; v <= vCount; v++) {
                    const opt = document.createElement('option');
                    opt.value = v;
                    opt.innerText = v;
                    if (v === vCount) {
                        opt.selected = true;
                    }
                    toVsSel.appendChild(opt);
                }
            });
        }

        function onQuizVersionChanged() {
            const version = document.getElementById('quiz-select-version').value;
            quizState.quizLanguage = (version === 'KJV') ? 'en' : 'es';
            applyQuizLanguage(quizState.quizLanguage);
            populateQuizBooks();
        }

        function applyQuizLanguage(lang) {
            const strings = QuizTranslations[lang];
            
            document.querySelectorAll('#quiz-modal [data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if (strings[key]) {
                    el.innerText = strings[key];
                }
            });
            
            const nameInput = document.getElementById('quiz-player-name');
            if (nameInput) nameInput.placeholder = lang === 'es' ? 'Ingrese nombre...' : 'Enter name...';
            
            const hostInput = document.getElementById('quiz-host-name');
            if (hostInput) {
                if (hostInput.value === 'Host' && lang === 'es') hostInput.value = 'Anfitrión';
                if (hostInput.value === 'Anfitrión' && lang === 'en') hostInput.value = 'Host';
            }
        }

        function loadVersesInRange(bookId, startCh, startVs, endCh, endVs, callback) {
            const originalLoad = window.bible_loader.load_chapter;
            const loadedData = [];
            let currentCh = startCh;
            
            function loadNext() {
                if (currentCh > endCh) {
                    window.bible_loader.load_chapter = originalLoad;
                    const finalVerses = [];
                    loadedData.forEach(item => {
                        const ch = item.chapter;
                        const verses = item.verses;
                        
                        Object.keys(verses).forEach(vKey => {
                            const vNum = parseInt(vKey);
                            if (ch === startCh && vNum < startVs) return;
                            if (ch === endCh && vNum > endVs) return;
                            
                            finalVerses.push({
                                chapter: ch,
                                verse: vNum,
                                translations: verses[vKey]
                            });
                        });
                    });
                    
                    finalVerses.sort((a, b) => {
                        if (a.chapter !== b.chapter) return a.chapter - b.chapter;
                        return a.verse - b.verse;
                    });
                    
                    callback(finalVerses);
                    return;
                }
                
                window.bible_loader.load_chapter = function(bId, cNum, versesData) {
                    loadedData.push({ chapter: cNum, verses: versesData });
                };
                
                const script = document.createElement('script');
                script.src = `bible_data/chapter_${bookId}_${currentCh}.js`;
                script.onload = function() {
                    if (script.parentNode) script.parentNode.removeChild(script);
                    currentCh++;
                    loadNext();
                };
                script.onerror = function() {
                    if (script.parentNode) script.parentNode.removeChild(script);
                    window.bible_loader.load_chapter = originalLoad;
                    callback(null);
                };
                document.head.appendChild(script);
            }
            
            loadNext();
        }

        function showQuizStatusMessage(msg, type) {
            let el = document.getElementById('quiz-status-msg');
            if (!el) {
                el = document.createElement('div');
                el.id = 'quiz-status-msg';
                el.style.cssText = 'margin: 0.75rem 0; padding: 0.75rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; text-align: center;';
                const generateBtn = document.getElementById('quiz-generate-btn');
                if (generateBtn) generateBtn.insertAdjacentElement('beforebegin', el);
            }
            if (type === 'loading') {
                el.style.background = 'rgba(245,158,11,0.12)';
                el.style.color = 'var(--color-accent)';
                el.style.border = '1px solid rgba(245,158,11,0.3)';
                el.innerHTML = `<span style="margin-right:6px">⏳</span>${msg}`;
            } else if (type === 'error') {
                el.style.background = 'rgba(248,113,113,0.1)';
                el.style.color = '#f87171';
                el.style.border = '1px solid rgba(248,113,113,0.3)';
                el.innerHTML = `<span style="margin-right:6px">❌</span>${msg}`;
            } else {
                el.style.background = 'rgba(16,185,129,0.1)';
                el.style.color = '#10b981';
                el.style.border = '1px solid rgba(16,185,129,0.3)';
                el.innerHTML = `<span style="margin-right:6px">✅</span>${msg}`;
            }
            el.style.display = 'block';
        }

        function hideQuizStatusMessage() {
            const el = document.getElementById('quiz-status-msg');
            if (el) el.style.display = 'none';
        }

        function startQuizGeneration() {
            const bookId = parseInt(document.getElementById('quiz-select-book').value);
            const startCh = parseInt(document.getElementById('quiz-select-from-ch').value);
            const startVs = parseInt(document.getElementById('quiz-select-from-vs').value);
            const endCh = parseInt(document.getElementById('quiz-select-to-ch').value);
            const endVs = parseInt(document.getElementById('quiz-select-to-vs').value);
            const version = document.getElementById('quiz-select-version').value;
            
            quizState.selectedBookId = bookId;
            quizState.selectedVersion = version;
            quizState.quizLanguage = (version === 'KJV') ? 'en' : 'es';
            const strings = QuizTranslations[quizState.quizLanguage];
            
            if (startCh > endCh || (startCh === endCh && startVs > endVs)) {
                showQuizStatusMessage(strings.msg_invalid_range, 'error');
                return;
            }
            
            const apiKey = localStorage.getItem('gemini_api_key');
            if (!apiKey) {
                showQuizStatusMessage(strings.msg_no_key, 'error');
                return;
            }
            
            showQuizStatusMessage(strings.msg_fetching_verses, 'loading');
            
            loadVersesInRange(bookId, startCh, startVs, endCh, endVs, function(verses) {
                if (!verses || verses.length === 0) {
                    showQuizStatusMessage(quizState.quizLanguage === 'es' ? 'Error al cargar los versículos de la Biblia.' : 'Error loading Bible verses.', 'error');
                    return;
                }
                
                showQuizStatusMessage(strings.msg_generating, 'loading');
                const numQuestions = Math.max(5, Math.min(15, Math.ceil(verses.length / 4)));
                
                let versesContext = "";
                verses.forEach(v => {
                    const txt = v.translations[version] || v.translations['KJV'] || '';
                    versesContext += `[Ref: Ch ${v.chapter} Vs ${v.verse}] ${txt}\n`;
                });
                
                const book = BIBLE_METADATA.find(b => b.id === bookId);
                const bookName = (quizState.quizLanguage === 'es') ? book.name_es : book.name_en;
                
                let prompt = "";
                if (quizState.quizLanguage === 'es') {
                    prompt = `Crea un cuestionario de trivia (trivia quiz) de exactamente ${numQuestions} preguntas basado estrictamente en el siguiente texto de los versículos del libro de ${bookName}:\n\n${versesContext}\n\n`;
                    prompt += `Genera exactamente ${numQuestions} preguntas de opción múltiple. Cada pregunta debe tener exactamente 4 opciones de respuesta y solo una de ellas debe ser correcta. El cuestionario debe estar completamente en español.\n`;
                    prompt += `Devuelve estrictamente un array JSON de objetos sin rodeos, explicaciones, introducciones ni formato markdown (no uses marcas de código como \`\`\`json). El JSON debe tener exactamente esta estructura:\n`;
                    prompt += `[\n  {\n    "question": "¿Pregunta?",\n    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],\n    "correct": 0,\n    "explanation": "Explicación breve o referencia al versículo"\n  }\n]`;
                } else {
                    prompt = `Create a trivia quiz of exactly ${numQuestions} questions based strictly on the following Bible verses from ${bookName}:\n\n${versesContext}\n\n`;
                    prompt += `Generate exactly ${numQuestions} multiple choice questions. Each question must have exactly 4 options and only one correct answer. The quiz must be completely in English.\n`;
                    prompt += `Return strictly a JSON array of objects with no intros, explanations, or markdown code fences (do not wrap in \`\`\`json). The JSON must have exactly this structure:\n`;
                    prompt += `[\n  {\n    "question": "Question?",\n    "options": ["Option A", "Option B", "Option C", "Option D"],\n    "correct": 0,\n    "explanation": "Brief explanation or source verse reference"\n  }\n]`;
                }
                
                fetchQuizFromGemini(apiKey, prompt, function(quizData) {
                    if (!quizData) {
                        showQuizStatusMessage(quizState.quizLanguage === 'es' ? 'Error al generar preguntas con IA. Por favor reintente.' : 'Error generating questions with AI. Please retry.', 'error');
                        return;
                    }
                    
                    // Sanitize and validate quizData
                    quizData.forEach(q => {
                        if (q.options && Array.isArray(q.options)) {
                            // Ensure exactly 4 options
                            while (q.options.length < 4) q.options.push("");
                            if (q.options.length > 4) q.options = q.options.slice(0, 4);
                            
                            let parsedCorrect = -1;
                            // Case 1: correct is a number or string representation of index (0-3)
                            if (q.correct !== undefined && q.correct !== null) {
                                const valStr = String(q.correct).trim();
                                if (valStr === '0' || valStr === '1' || valStr === '2' || valStr === '3') {
                                    parsedCorrect = parseInt(valStr, 10);
                                } else {
                                    // Case 2: correct is the text of one of the options
                                    const matchIdx = q.options.findIndex(opt => 
                                        opt.toLowerCase().trim() === valStr.toLowerCase()
                                    );
                                    if (matchIdx !== -1) {
                                        parsedCorrect = matchIdx;
                                    }
                                }
                            }
                            
                            // Fallback: default to 0 if not found
                            q.correct = (parsedCorrect !== -1) ? parsedCorrect : 0;
                        } else {
                            q.options = ["", "", "", ""];
                            q.correct = 0;
                        }
                    });
                    
                    quizState.questions = quizData;
                    hideQuizStatusMessage();
                    
                    if (quizState.mode === 'single') {
                        startSinglePlayerGame();
                    } else {
                        initMultiplayerHost();
                    }
                });
            });
        }

        async function fetchQuizFromGemini(apiKey, prompt, callback) {
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
                        })
                    }
                );
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
                const result = await response.json();
                let rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
                rawText = rawText.trim();
                // Strip markdown code fences if present
                if (rawText.startsWith('```')) {
                    const firstNewline = rawText.indexOf('\n');
                    if (firstNewline !== -1) rawText = rawText.substring(firstNewline + 1);
                    if (rawText.endsWith('```')) rawText = rawText.substring(0, rawText.length - 3);
                    rawText = rawText.trim();
                }
                const quizData = JSON.parse(rawText);
                if (!Array.isArray(quizData) || quizData.length === 0) {
                    throw new Error('Invalid quiz data returned');
                }
                callback(quizData);
            } catch (err) {
                console.error('fetchQuizFromGemini error:', err);
                callback(null);
            }
        }

        function startSinglePlayerGame() {
            quizState.role = 'host';
            quizState.currentQIdx = 0;
            quizState.players = [{ name: 'Player', clientId: 'single', score: 0 }];
            
            // Apply language to layout
            applyQuizLanguage(quizState.quizLanguage);
            loadHostQuestion();
        }

        function initMultiplayerHost() {
            quizState.role = 'host';
            quizState.roomCode = Math.floor(1000 + Math.random() * 9000).toString();
            
            const hostName = document.getElementById('quiz-host-name').value.trim() || (quizState.quizLanguage === 'es' ? 'Anfitrión' : 'Host');
            quizState.nickname = hostName;
            quizState.players = [];
            
            applyQuizLanguage(quizState.quizLanguage);
            showQuizStatusMessage(QuizTranslations[quizState.quizLanguage].msg_connecting, 'loading');
            
            // Connect to public HiveMQ WebSocket broker (SSL enabled on 8884)
            quizState.client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');
            
            quizState.client.on('connect', () => {
                quizState.client.subscribe(`bible-study-quiz/${quizState.roomCode}/join`);
                quizState.client.subscribe(`bible-study-quiz/${quizState.roomCode}/answer`);
                
                hideQuizStatusMessage();
                showQuizView('host-lobby');
                
                let hostOrigin = window.location.origin;
                let pathname = window.location.pathname;
                if (window.LOCAL_IP && (hostOrigin.includes('localhost') || hostOrigin.includes('127.0.0.1') || window.location.protocol === 'file:')) {
                    hostOrigin = `http://${window.LOCAL_IP}:8000`;
                    pathname = '/bible_study.html';
                }
                const joinUrl = `${hostOrigin}${pathname}?room=${quizState.roomCode}&role=player&lang=${quizState.quizLanguage}`;
                document.getElementById('quiz-lobby-url-text').innerText = joinUrl;
                
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(joinUrl)}`;
                document.getElementById('quiz-lobby-qrcode').innerHTML = `<img src="${qrUrl}" style="width: 130px; height: 130px;" alt="Lobby QR Code">`;
                document.getElementById('quiz-lobby-code').innerText = quizState.roomCode;
                
                // Populate popup QR code elements
                const qrOverlayImg = document.getElementById('quiz-host-qr-overlay-img');
                if (qrOverlayImg) {
                    qrOverlayImg.innerHTML = `<img src="${qrUrl}" style="width: 160px; height: 160px;" alt="Join QR Code">`;
                }
                document.querySelectorAll('.active-room-code').forEach(el => {
                    el.innerText = quizState.roomCode;
                });
                
                broadcastQuizState({
                    state: 'lobby',
                    players: [],
                    lang: quizState.quizLanguage
                });
            });
            
            quizState.client.on('message', (topic, message) => {
                try {
                    const payload = JSON.parse(message.toString());
                    const subTopics = topic.split('/');
                    const msgType = subTopics[subTopics.length - 1];
                    
                    if (msgType === 'join') {
                        handlePlayerJoin(payload);
                    } else if (msgType === 'answer') {
                        handlePlayerAnswer(payload);
                    }
                } catch (e) {
                    console.error("MQTT message handling error:", e);
                }
            });
        }

        function handlePlayerJoin(payload) {
            const name = payload.name;
            const clientId = payload.clientId;
            
            const existingPlayer = quizState.players.find(p => p.name.toLowerCase() === name.toLowerCase());
            
            if (existingPlayer) {
                // Reconnect existing player under their name but with new clientId
                existingPlayer.clientId = clientId;
                publishToClient(clientId, { type: 'join_result', success: true });
                
                updateLobbyPlayersList();
                
                // Determine current game state to broadcast to the reconnected client
                let currentState = 'lobby';
                if (quizState.currentQIdx >= 0) {
                    currentState = quizState.timerVal > 0 ? 'question' : 'results';
                }
                
                // Broadcast updated state
                const scoresMap = {};
                quizState.players.forEach(p => {
                    scoresMap[p.clientId] = { score: p.score };
                });
                
                broadcastQuizState({
                    state: currentState,
                    qNum: quizState.currentQIdx + 1,
                    totalQ: quizState.questions.length,
                    scores: scoresMap,
                    players: quizState.players.map(p => p.name),
                    lang: quizState.quizLanguage
                });
                return;
            }
            
            publishToClient(clientId, { type: 'join_result', success: true });
            
            quizState.players.push({
                name: name,
                clientId: clientId,
                score: 0,
                lastCorrect: false,
                lastScore: 0,
                lastAnswerIdx: -1
            });
            
            updateLobbyPlayersList();
            
            broadcastQuizState({
                state: 'lobby',
                players: quizState.players.map(p => p.name),
                lang: quizState.quizLanguage
            });
        }

        function updateLobbyPlayersList() {
            document.getElementById('quiz-lobby-player-count').innerText = quizState.players.length;
            const listEl = document.getElementById('quiz-lobby-players-list');
            listEl.innerHTML = '';
            quizState.players.forEach(p => {
                const card = document.createElement('div');
                card.className = 'quiz-player-card';
                card.innerText = p.name;
                listEl.appendChild(card);
            });
        }

        function broadcastQuizState(stateData) {
            if (quizState.client) {
                quizState.client.publish(`bible-study-quiz/${quizState.roomCode}/state`, JSON.stringify(stateData), { retain: true });
            }
        }
        
        function publishToClient(clientId, msgData) {
            if (quizState.client) {
                quizState.client.publish(`bible-study-quiz/${quizState.roomCode}/client/${clientId}`, JSON.stringify(msgData));
            }
        }

        // Host Question Screen Loading
        function loadHostQuestion() {
            quizState.answersReceived = {};
            clearInterval(quizState.timerInterval);
            
            const q = quizState.questions[quizState.currentQIdx];
            
            // Update UI elements
            document.getElementById('quiz-host-q-number').innerText = quizState.quizLanguage === 'es' ? 
                `Pregunta ${quizState.currentQIdx + 1} de ${quizState.questions.length}` : 
                `Question ${quizState.currentQIdx + 1} of ${quizState.questions.length}`;
            document.getElementById('quiz-host-question-text').innerText = q.question;
            
            document.getElementById('quiz-opt-text-0').innerText = q.options[0];
            document.getElementById('quiz-opt-text-1').innerText = q.options[1];
            document.getElementById('quiz-opt-text-2').innerText = q.options[2];
            document.getElementById('quiz-opt-text-3').innerText = q.options[3];
            
            // Remove previous classes
            document.querySelectorAll('.quiz-option-btn').forEach(btn => {
                btn.className = btn.className.replace(/\bincorrect\b/g, '').trim();
                btn.disabled = (quizState.mode !== 'single'); // only clickable in single player
            });
            
            quizState.timerVal = 20;
            document.getElementById('quiz-host-timer').innerText = quizState.timerVal;
            document.getElementById('quiz-host-answers-count').innerText = quizState.quizLanguage === 'es' ?
                `Respuestas: 0 / ${quizState.mode === 'single' ? 1 : quizState.players.length}` :
                `Responses: 0 / ${quizState.mode === 'single' ? 1 : quizState.players.length}`;
            
            showQuizView('host-question');
            
            // Broadcast state to clients
            if (quizState.mode === 'multi') {
                const scoresMap = {};
                quizState.players.forEach(p => {
                    scoresMap[p.clientId] = { score: p.score };
                });
                
                broadcastQuizState({
                    state: 'question',
                    qNum: quizState.currentQIdx + 1,
                    totalQ: quizState.questions.length,
                    scores: scoresMap,
                    lang: quizState.quizLanguage
                });
            }
            
            // Start Timer Interval
            quizState.timerStartTime = Date.now();
            quizState.timerInterval = setInterval(() => {
                quizState.timerVal--;
                document.getElementById('quiz-host-timer').innerText = quizState.timerVal;
                
                if (quizState.timerVal <= 0) {
                    endQuizQuestionTimer();
                }
            }, 1000);
        }

        function onHostClickOption(idx) {
            if (quizState.mode !== 'single') return;
            quizState.answersReceived['single'] = {
                answerIdx: idx,
                timeTakenMs: Date.now() - quizState.timerStartTime
            };
            endQuizQuestionTimer();
        }

        function handlePlayerAnswer(payload) {
            const clientId = payload.clientId;
            if (quizState.answersReceived[clientId]) return; // already answered
            
            quizState.answersReceived[clientId] = {
                answerIdx: payload.answerIdx,
                timeTakenMs: payload.timeTakenMs
            };
            
            const answeredCount = Object.keys(quizState.answersReceived).length;
            document.getElementById('quiz-host-answers-count').innerText = quizState.quizLanguage === 'es' ?
                `Respuestas: ${answeredCount} / ${quizState.players.length}` :
                `Responses: ${answeredCount} / ${quizState.players.length}`;
            
            if (answeredCount === quizState.players.length) {
                endQuizQuestionTimer();
            }
        }

        function endQuizQuestionTimer() {
            clearInterval(quizState.timerInterval);
            
            const q = quizState.questions[quizState.currentQIdx];
            document.getElementById('quiz-correct-answer-text').innerText = q.options[q.correct] + 
                (q.explanation ? ` (${q.explanation})` : '');
            
            // Compute distributions
            const counts = [0, 0, 0, 0];
            if (quizState.mode === 'single') {
                const ans = quizState.answersReceived['single'];
                if (ans) counts[ans.answerIdx]++;
                
                // Update button visual styles for single player
                document.querySelectorAll('.quiz-option-btn').forEach((btn, idx) => {
                    btn.disabled = true;
                    if (idx !== q.correct) {
                        btn.classList.add('incorrect');
                    }
                });
            } else {
                quizState.players.forEach(p => {
                    const ans = quizState.answersReceived[p.clientId];
                    if (ans) {
                        counts[ans.answerIdx]++;
                        const correct = (ans.answerIdx === q.correct);
                        p.lastCorrect = correct;
                        p.lastAnswerIdx = ans.answerIdx;
                        if (correct) {
                            const pts = Math.max(500, Math.ceil(1000 * (1 - (ans.timeTakenMs / 20000) * 0.5)));
                            p.score += pts;
                            p.lastScore = pts;
                        } else {
                            p.lastScore = 0;
                        }
                    } else {
                        p.lastCorrect = false;
                        p.lastScore = 0;
                        p.lastAnswerIdx = -1;
                    }
                });
            }
            
            // Render chart
            const maxVal = Math.max(1, ...counts);
            for (let i = 0; i < 4; i++) {
                const bar = document.getElementById(`quiz-bar-${i}`);
                const pct = (counts[i] / maxVal) * 100;
                bar.style.height = `${pct}%`;
                bar.innerText = counts[i];
            }
            
            // Render leaderboard & Broadcast
            if (quizState.mode === 'multi') {
                renderLeaderboard();
                
                const clientResults = {};
                quizState.players.forEach(p => {
                    clientResults[p.clientId] = {
                        score: p.score,
                        correct: p.lastCorrect,
                        points: p.lastScore
                    };
                });
                
                broadcastQuizState({
                    state: 'results',
                    correctIdx: q.correct,
                    scores: clientResults,
                    lang: quizState.quizLanguage
                });
            } else {
                const listEl = document.getElementById('quiz-leaderboard-list');
                const correct = quizState.answersReceived['single']?.answerIdx === q.correct;
                listEl.innerHTML = `
                    <div class="quiz-leaderboard-row winner">
                        <div class="rank-name">
                            <span class="rank-num">1</span>
                            <span>${quizState.quizLanguage === 'es' ? 'Su Puntuación' : 'Your Score'}</span>
                        </div>
                        <div style="font-weight:bold; color:var(--text-secondary);">${correct ? '1000' : '0'} pts</div>
                    </div>
                `;
            }
            
            showQuizView('host-results');
        }

        function renderLeaderboard() {
            const listEl = document.getElementById('quiz-leaderboard-list');
            listEl.innerHTML = '';
            
            const sorted = [...quizState.players].sort((a, b) => b.score - a.score);
            sorted.forEach((p, idx) => {
                const row = document.createElement('div');
                row.className = `quiz-leaderboard-row ${idx === 0 ? 'winner' : ''}`;
                row.innerHTML = `
                    <div class="rank-name">
                        <span class="rank-num">${idx + 1}</span>
                        <span>${p.name}</span>
                    </div>
                    <div style="font-weight:bold; color:var(--text-secondary);">${p.score} pts</div>
                `;
                listEl.appendChild(row);
            });
        }

        function advanceQuizQuestion() {
            quizState.currentQIdx++;
            if (quizState.currentQIdx < quizState.questions.length) {
                loadHostQuestion();
            } else {
                endQuizGame();
            }
        }

        function endQuizGame() {
            clearInterval(quizState.timerInterval);
            
            const sorted = [...quizState.players].sort((a, b) => b.score - a.score);
            
            document.getElementById('podium-1').style.display = 'none';
            document.getElementById('podium-2').style.display = 'none';
            document.getElementById('podium-3').style.display = 'none';
            
            if (sorted.length >= 1) {
                document.getElementById('podium-1').style.display = 'flex';
                document.getElementById('podium-name-1').innerText = `${sorted[0].name}\n(${sorted[0].score} pts)`;
            }
            if (sorted.length >= 2) {
                document.getElementById('podium-2').style.display = 'flex';
                document.getElementById('podium-name-2').innerText = `${sorted[1].name}\n(${sorted[1].score} pts)`;
            }
            if (sorted.length >= 3) {
                document.getElementById('podium-3').style.display = 'flex';
                document.getElementById('podium-name-3').innerText = `${sorted[2].name}\n(${sorted[2].score} pts)`;
            }
            
            const finalLb = document.getElementById('quiz-final-leaderboard');
            finalLb.innerHTML = '';
            sorted.forEach((p, idx) => {
                const row = document.createElement('div');
                row.className = 'quiz-leaderboard-row';
                row.innerHTML = `
                    <div class="rank-name">
                        <span class="rank-num">${idx + 1}</span>
                        <span>${p.name}</span>
                    </div>
                    <div style="font-weight:bold; color:var(--text-secondary);">${p.score} pts</div>
                `;
                finalLb.appendChild(row);
            });
            
            if (quizState.mode === 'multi') {
                broadcastQuizState({
                    state: 'end',
                    podium: sorted.slice(0, 3).map(p => p.name),
                    lang: quizState.quizLanguage
                });
            }
            
            showQuizView('end');
        }

        function resetQuizToSetup() {
            resetQuizState();
            openQuizModal();
        }

        // ==========================================
        // --- 6. Client Mode Lobby Join Logic ---
        // ==========================================
        let clientQuestionStartTime = 0;
        let clientCanAnswer = false;

        function openClientJoinLobby(roomCode, lang) {
            resetQuizState();
            if (lang) {
                quizState.quizLanguage = lang;
            }
            quizState.role = 'client';
            quizState.roomCode = roomCode;
            
            applyQuizLanguage(quizState.quizLanguage);
            
            document.getElementById('quiz-client-room-display').innerText = roomCode;
            showQuizView('client-join');
            
            const modal = document.getElementById('quiz-modal');
            modal.style.display = 'flex';
        }

        function submitClientJoin() {
            const nickname = document.getElementById('quiz-player-name').value.trim();
            if (!nickname) {
                alert("Please enter your name.");
                return;
            }
            
            quizState.nickname = nickname;
            connectAndJoinMqtt();
        }

        function connectAndJoinMqtt() {
            showQuizStatusMessage(quizState.quizLanguage === 'es' ? 'Conectando al juego...' : 'Connecting to game...', 'loading');
            
            if (quizState.client) {
                try { quizState.client.end(); } catch(e) {}
            }
            
            quizState.client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');
            
            quizState.client.on('connect', () => {
                quizState.client.subscribe(`bible-study-quiz/${quizState.roomCode}/client/${quizState.clientId}`);
                quizState.client.subscribe(`bible-study-quiz/${quizState.roomCode}/state`);
                
                quizState.client.publish(`bible-study-quiz/${quizState.roomCode}/join`, JSON.stringify({
                    name: quizState.nickname,
                    clientId: quizState.clientId
                }));
            });
            
            quizState.client.on('message', (topic, message) => {
                try {
                    const payload = JSON.parse(message.toString());
                    const subTopics = topic.split('/');
                    const lastTopic = subTopics[subTopics.length - 1];
                    
                    if (lastTopic === quizState.clientId) {
                        if (payload.type === 'join_result') {
                            if (payload.success) {
                                hideQuizStatusMessage();
                                document.getElementById('quiz-client-name-display').innerText = quizState.nickname;
                                showQuizView('client-lobby');
                                
                                // Save room code and nickname for auto-join reconnection
                                localStorage.setItem('quiz_last_room', quizState.roomCode);
                                localStorage.setItem('quiz_nickname', quizState.nickname);
                            } else {
                                showQuizStatusMessage(payload.reason === 'duplicate' ? 
                                    'Ese nombre ya está en uso. Elija otro.' : 'Error joining room.', 'error');
                                quizState.client.end();
                            }
                        }
                    } else if (lastTopic === 'state') {
                        handleReceivedQuizState(payload);
                    }
                } catch (e) {
                    console.error("Client message error:", e);
                }
            });
            
            quizState.client.on('error', (err) => {
                showQuizStatusMessage('Connection Error: ' + err.message, 'error');
            });
        }

        function toggleLobbyQROverlay() {
            const overlay = document.getElementById('quiz-host-qr-overlay');
            if (overlay) {
                if (overlay.style.display === 'none' || !overlay.style.display) {
                    overlay.style.display = 'flex';
                } else {
                    overlay.style.display = 'none';
                }
            }
        }

        function handleReceivedQuizState(payload) {
            if (payload.lang) {
                quizState.quizLanguage = payload.lang;
                applyQuizLanguage(quizState.quizLanguage);
            }
            if (payload.state === 'lobby') {
                const listText = quizState.quizLanguage === 'es' ? 'En el Lobby: ' : 'In Lobby: ';
                document.getElementById('quiz-client-waiting-subtitle').innerText = listText + (payload.players?.join(', ') || '');
            } else if (payload.state === 'question') {
                document.getElementById('quiz-client-nickname').innerText = quizState.nickname;
                document.getElementById('quiz-client-score-display').innerText = `${payload.scores?.[quizState.clientId]?.score || 0} pts`;
                
                document.getElementById('quiz-client-waiting-screen').style.display = 'none';
                document.getElementById('quiz-client-feedback-screen').style.display = 'none';
                document.getElementById('quiz-client-buttons-screen').style.display = 'grid';
                
                quizState.currentQIdx = payload.qNum - 1;
                clientQuestionStartTime = Date.now();
                clientCanAnswer = true;
                
                showQuizView('player-controller');
            } else if (payload.state === 'results') {
                document.getElementById('quiz-client-buttons-screen').style.display = 'none';
                
                const result = payload.scores?.[quizState.clientId];
                const badge = document.getElementById('quiz-client-feedback-badge');
                const text = document.getElementById('quiz-client-feedback-text');
                const points = document.getElementById('quiz-client-feedback-points');
                const container = document.getElementById('quiz-client-feedback-screen');
                
                if (result) {
                    document.getElementById('quiz-client-score-display').innerText = `${result.score} pts`;
                    if (result.correct) {
                        badge.innerText = '✓';
                        badge.style.color = '#10b981';
                        text.innerText = quizState.quizLanguage === 'es' ? '¡Correcto!' : 'Correct!';
                        points.innerText = `+${result.points} pts`;
                        container.style.background = 'rgba(16,185,129,0.08)';
                    } else {
                        badge.innerText = '✕';
                        badge.style.color = '#ef4444';
                        text.innerText = quizState.quizLanguage === 'es' ? 'Incorrecto' : 'Incorrect';
                        points.innerText = '+0 pts';
                        container.style.background = 'rgba(239,68,68,0.08)';
                    }
                } else {
                    badge.innerText = '-';
                    badge.style.color = 'var(--text-muted)';
                    text.innerText = quizState.quizLanguage === 'es' ? 'Sin Respuesta' : 'No Answer';
                    points.innerText = '';
                }
                
                container.style.display = 'block';
                showQuizView('player-controller');
            } else if (payload.state === 'end') {
                const finalLb = document.getElementById('quiz-final-leaderboard');
                finalLb.innerHTML = '';
                showQuizView('end');
            }
        }

        function submitClientAnswer(idx) {
            if (!clientCanAnswer) return;
            clientCanAnswer = false;
            
            document.getElementById('quiz-client-buttons-screen').style.display = 'none';
            
            const badge = document.getElementById('quiz-client-feedback-badge');
            const text = document.getElementById('quiz-client-feedback-text');
            const points = document.getElementById('quiz-client-feedback-points');
            
            badge.innerText = '⌛';
            badge.style.color = 'var(--text-muted)';
            text.innerText = quizState.quizLanguage === 'es' ? 'Respuesta Enviada' : 'Answer Submitted';
            points.innerText = quizState.quizLanguage === 'es' ? 'Esperando a otros...' : 'Waiting for others...';
            
            document.getElementById('quiz-client-feedback-screen').style.display = 'block';
            document.getElementById('quiz-client-feedback-screen').style.background = 'none';
            
            if (quizState.client) {
                quizState.client.publish(`bible-study-quiz/${quizState.roomCode}/answer`, JSON.stringify({
                    clientId: quizState.clientId,
                    name: quizState.nickname,
                    answerIdx: idx,
                    timeTakenMs: Date.now() - clientQuestionStartTime
                }));
            }
        }

        function startMultiplayerGame() {
            if (quizState.players.length === 0) {
                alert(quizState.quizLanguage === 'es' ? 'Espere a que los jugadores se unan primero.' : 'Wait for players to join first.');
                return;
            }
            quizState.currentQIdx = 0;
            loadHostQuestion();
        }

        window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const roomCode = urlParams.get('room');
            const role = urlParams.get('role');
            const lang = urlParams.get('lang');
            
            if (roomCode && role === 'player') {
                setTimeout(() => {
                    const savedRoom = localStorage.getItem('quiz_last_room');
                    const savedName = localStorage.getItem('quiz_nickname');
                    
                    if (savedRoom === roomCode && savedName) {
                        // Bypasses nickname entry and auto-joins!
                        quizState.roomCode = roomCode;
                        quizState.nickname = savedName;
                        quizState.quizLanguage = lang || 'en';
                        applyQuizLanguage(quizState.quizLanguage);
                        
                        document.getElementById('quiz-client-room-display').innerText = roomCode;
                        showQuizView('client-lobby');
                        
                        connectAndJoinMqtt();
                    } else {
                        // Standard join flow
                        openClientJoinLobby(roomCode, lang);
                    }
                }, 500);
            }
        });

        function prevHelpSlide() {
            if (currentHelpSlideIndex > 0) {
                showHelpSlide(currentHelpSlideIndex - 1);
            }
        }

        function nextHelpSlide() {
            if (currentHelpSlideIndex < totalHelpSlides - 1) {
                showHelpSlide(currentHelpSlideIndex + 1);
            } else {
                closeHelpModal();
            }
        }

        // ==========================================
        // --- 7. Random Verse Lookup Game Logic ---
        // ==========================================
        function openRandomVerseModal() {
            stopTTS();
            
            // Show modal
            document.getElementById('random-verse-modal').style.display = 'flex';
            
            // Populate version selector
            const versionSel = document.getElementById('random-game-select-version');
            versionSel.innerHTML = '';
            const versionsList = [
                { id: 'KJV', name: 'King James Version' },
                { id: '60', name: 'Reina Valera 1960' },
                { id: '65', name: 'Reina Valera 1865' },
                { id: '09', name: 'Reina Valera 1909' },
                { id: 'VG', name: 'Reina Valera Gómez' },
                { id: 'VP', name: 'Reina Valera 1602 Purificada' },
                { id: 'BO', name: 'Biblia del Oso 1569' }
            ];
            
            versionsList.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.id;
                opt.innerText = v.name;
                if (typeof singleFocusVersion !== 'undefined' && v.id === singleFocusVersion) {
                    opt.selected = true;
                } else if (v.id === 'KJV') {
                    opt.selected = true;
                }
                versionSel.appendChild(opt);
            });
            
            // Hide play, show setup
            document.getElementById('random-game-setup').style.display = 'block';
            document.getElementById('random-game-play').style.display = 'none';
            
            updateRandomGameLanguage();
            setupRandomVerseEvents();
        }

        function closeRandomVerseModal() {
            document.getElementById('random-verse-modal').style.display = 'none';
        }

        function closeRandomVerseModalOnOuterClick(e) {
            if (e.target.id === 'random-verse-modal') {
                closeRandomVerseModal();
            }
        }

        function updateRandomGameLanguage() {
            const version = document.getElementById('random-game-select-version').value;
            const lang = (version === 'KJV') ? 'en' : 'es';
            applyRandomGameLanguage(lang);
        }

        function applyRandomGameLanguage(lang) {
            const strings = QuizTranslations[lang];
            document.querySelectorAll('#random-verse-modal [data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if (strings[key]) {
                    el.innerText = strings[key];
                }
            });
        }

        function fetchRandomVerseData(bookId, chNum, callback) {
            const originalLoad = window.bible_loader.load_chapter;
            window.bible_loader.load_chapter = function(bId, cNum, versesData) {
                window.bible_loader.load_chapter = originalLoad;
                callback(versesData);
            };
            const script = document.createElement('script');
            script.src = `bible_data/chapter_${bookId}_${chNum}.js`;
            script.onload = function() {
                if (script.parentNode) script.parentNode.removeChild(script);
            };
            script.onerror = function() {
                if (script.parentNode) script.parentNode.removeChild(script);
                window.bible_loader.load_chapter = originalLoad;
                callback(null);
            };
            document.head.appendChild(script);
        }

        let randomGameState = {
            version: 'KJV',
            lang: 'en',
            isRevealed: false,
            content: ''
        };

        function drawRandomVerse() {
            const version = document.getElementById('random-game-select-version').value;
            const lang = (version === 'KJV') ? 'en' : 'es';
            const strings = QuizTranslations[lang];
            
            // Show loading state
            document.getElementById('random-game-setup').style.display = 'none';
            document.getElementById('random-game-play').style.display = 'block';
            
            const refEl = document.getElementById('random-verse-reference');
            refEl.innerText = strings.random_game_loading;
            
            const revealBtn = document.getElementById('random-verse-reveal-btn');
            revealBtn.style.display = 'block';
            revealBtn.style.opacity = '1';
            revealBtn.innerText = strings.random_game_reveal_prompt;
            
            const contentEl = document.getElementById('random-verse-content-text');
            contentEl.style.display = 'none';
            contentEl.innerText = '';
            
            randomGameState = {
                version: version,
                lang: lang,
                isRevealed: false,
                content: ''
            };
            
            // Pick a random book
            const randomBook = BIBLE_METADATA[Math.floor(Math.random() * BIBLE_METADATA.length)];
            // Pick a random chapter
            const randomCh = Math.floor(Math.random() * randomBook.chapters) + 1;
            
            // Fetch chapter verses data
            fetchRandomVerseData(randomBook.id, randomCh, function(versesData) {
                if (!versesData) {
                    refEl.innerText = lang === 'es' ? 'Error al cargar. Intente de nuevo.' : 'Error loading. Try again.';
                    return;
                }
                
                const keys = Object.keys(versesData);
                if (keys.length === 0) {
                    refEl.innerText = lang === 'es' ? 'Error: Sin versículos.' : 'Error: No verses found.';
                    return;
                }
                
                // Pick a random verse
                const randomVsKey = keys[Math.floor(Math.random() * keys.length)];
                const vsNum = parseInt(randomVsKey);
                const verseObj = versesData[randomVsKey];
                
                const bookName = (lang === 'es') ? randomBook.name_es : randomBook.name_en;
                refEl.innerText = `${bookName} ${randomCh}:${vsNum}`;
                
                randomGameState.content = verseObj[version] || verseObj['KJV'] || '';
            });
        }

        function revealRandomVerseContent() {
            if (randomGameState.isRevealed) return;
            randomGameState.isRevealed = true;
            
            const revealBtn = document.getElementById('random-verse-reveal-btn');
            revealBtn.style.display = 'none';
            
            const contentEl = document.getElementById('random-verse-content-text');
            contentEl.innerText = randomGameState.content;
            contentEl.style.display = 'block';
        }

        function setupRandomVerseEvents() {
            const btn = document.getElementById('random-verse-reveal-btn');
            const container = document.getElementById('random-verse-reveal-container');
            if (!btn || !container) return;
            
            // Use container-level hover to avoid the button/content flash cycle
            // (hovering into the content div would trigger mouseleave on button → flash)
            // Hover-reveal removed — verse text now reveals on click only
        }

// ===== Panel Collapse / Expand Toggles =====
        let leftPanelCollapsed = false;
        let rightPanelHidden = false;

        function toggleLeftPanel() {
            const sidebar = document.getElementById('sidebar');
            const btn = document.getElementById('left-panel-collapse-btn');
            leftPanelCollapsed = !leftPanelCollapsed;
            if (leftPanelCollapsed) {
                sidebar.style.width = '0';
                sidebar.style.minWidth = '0';
                sidebar.style.overflow = 'hidden';
                sidebar.style.borderRight = 'none';
                btn.style.left = '0';
                btn.style.transform = 'translateY(-50%)';
                btn.textContent = '\u25b6';
                btn.title = 'Show left panel';
            } else {
                sidebar.style.width = '';
                sidebar.style.minWidth = '';
                sidebar.style.overflow = '';
                sidebar.style.borderRight = '';
                btn.style.left = '';
                btn.style.transform = '';
                btn.textContent = '\u25c0';
                btn.title = 'Hide left panel';
            }
        }

        function toggleRightPanel() {
            const panel = document.getElementById('study-panel');
            const btn = document.getElementById('right-panel-collapse-btn');
            const overlay = document.getElementById('study-overlay');
            const mainPanel = document.querySelector('.main-panel');
            if (!panel || !btn) return;
            
            rightPanelHidden = !rightPanelHidden;
            if (rightPanelHidden) {
                panel.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                
                const currentWidth = panel.offsetWidth || parseInt(panel.style.width) || 400;
                panel.style.right = `-${currentWidth + 20}px`;
                btn.style.right = '0';
                btn.textContent = '\u25c0';
                btn.title = 'Show right panel';
                
                if (mainPanel) mainPanel.style.marginRight = '0';
            } else {
                panel.classList.add('active');
                if (overlay) overlay.classList.add('active');
                
                panel.style.right = '0';
                const currentWidth = panel.offsetWidth || parseInt(panel.style.width) || 400;
                btn.style.right = `${currentWidth}px`;
                btn.textContent = '\u25b6';
                btn.title = 'Hide right panel';
                
                if (mainPanel) mainPanel.style.marginRight = `${currentWidth}px`;
            }
        }

        // Show the right collapse button whenever the study panel opens
        function showRightPanelCollapseBtn() {
            const btn = document.getElementById('right-panel-collapse-btn');
            const panel = document.getElementById('study-panel');
            if (btn && panel) {
                btn.style.display = 'flex';
                const isActive = panel.classList.contains('active');
                if (isActive) {
                    const currentWidth = panel.offsetWidth || parseInt(panel.style.width) || 400;
                    btn.style.right = `${currentWidth}px`;
                    btn.textContent = '\u25b6'; // ▶
                } else {
                    btn.style.right = '0';
                    btn.textContent = '\u25c0'; // ◀
                }
            }
        }

// --- Resize and Maximize logic for AI Study Panel ---
let isResizing = false;
let startX, startWidth;

document.addEventListener('DOMContentLoaded', () => {
    const studyPanel = document.getElementById('study-panel');
    if (!studyPanel) return;
    
    const studyResizer = document.createElement('div');
    studyResizer.className = 'study-resizer';
    studyResizer.id = 'study-resizer';
    studyPanel.appendChild(studyResizer);

    studyResizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = parseInt(document.defaultView.getComputedStyle(studyPanel).width, 10);
        document.documentElement.addEventListener('mousemove', doResize, false);
        document.documentElement.addEventListener('mouseup', stopResize, false);
        e.preventDefault();
    });

    function doResize(e) {
        if (!isResizing) return;
        const width = startWidth - (e.clientX - startX);
        if (width > 300 && width < window.innerWidth * 0.95) {
            studyPanel.style.width = width + 'px';
            const btn = document.getElementById('right-panel-collapse-btn');
            if (btn && !rightPanelHidden) {
                btn.style.right = width + 'px';
            }
            const mainPanel = document.querySelector('.main-panel');
            if (mainPanel && !rightPanelHidden) {
                mainPanel.style.marginRight = width + 'px';
            }
        }
    }

    function stopResize(e) {
        isResizing = false;
        document.documentElement.removeEventListener('mousemove', doResize, false);
        document.documentElement.removeEventListener('mouseup', stopResize, false);
    }
});

// Maximize function
function toggleMaximizeStudyPanel() {
    const studyPanel = document.getElementById('study-panel');
    if (!studyPanel) return;
    studyPanel.classList.toggle('maximized');
    if (studyPanel.classList.contains('maximized')) {
        studyPanel.style.width = ''; // clear custom drag width
    }
    
    const mainPanel = document.querySelector('.main-panel');
    if (mainPanel) {
        const isActive = studyPanel.classList.contains('active');
        if (isActive && !rightPanelHidden) {
            const currentWidth = studyPanel.offsetWidth || 400;
            mainPanel.style.marginRight = `${currentWidth}px`;
        } else {
            mainPanel.style.marginRight = '0';
        }
    }
    
    showRightPanelCollapseBtn(); // Update collapse button position
}
