
    // Modern Alert Fonksiyonları
    function showAlert(message, type = 'info', options = {}) {
      const alert = document.getElementById('customAlert');
      const alertMessage = document.getElementById('alertMessage');
      const alertButtons = document.getElementById('alertButtons');
      
      alertMessage.innerHTML = message;
      alertButtons.innerHTML = '';
      
      // Alert stilini ayarla
      const content = alert.querySelector('.alert-content');
      switch(type) {
        case 'success':
          content.style.background = 'linear-gradient(145deg, #25D366 0%, #128C7E 100%)';
          break;
        case 'error':
          content.style.background = 'linear-gradient(145deg, #e56969 0%, #c1558b 100%)';
          break;
        case 'warning':
          content.style.background = 'linear-gradient(145deg, #ff9800 0%, #f57c00 100%)';
          break;
        default:
          content.style.background = 'linear-gradient(145deg, #4C1C24 0%, #8a49a1 100%)';
      }
      
      // Butonları ekle
      if(options.confirm) {
        alertButtons.innerHTML = `
          <button class="alert-button primary" onclick="hideAlert(true)">
            <i class="fas fa-check-circle"></i> ${options.confirmText || 'Evet'}
          </button>
          <button class="alert-button secondary" onclick="hideAlert(false)">
            <i class="fas fa-times-circle"></i> ${options.cancelText || 'Hayır'}
          </button>
        `;
      } else {
        alertButtons.innerHTML = `
          <button class="alert-button primary" onclick="hideAlert()">
            <i class="fas fa-thumbs-up"></i> Tamam
          </button>
        `;
      }
      
      alert.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      // Promise döndür (confirm için)
      if(options.confirm) {
        return new Promise(resolve => {
          alert._resolve = resolve;
        });
      }
    }
    
    function hideAlert(result = null) {
      const alert = document.getElementById('customAlert');
      alert.classList.remove('show');
      document.body.style.overflow = '';
      
      if(alert._resolve) {
        alert._resolve(result);
        delete alert._resolve;
      }
    }

    // Form gönderim işlemi (DÜZELTİLMİŞ)
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // E-posta adresini hidden inputa kopyala
      document.getElementById('_replyto').value = document.getElementById('email').value;
      
      const form = e.target;
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
      submitButton.disabled = true;
      
      try {
        // Form verilerini topla
        const formData = new FormData(form);
        
        // Formspree'ye gönder
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          await showAlert('Mesajınız başarıyla gönderildi!', 'success');
          form.reset();
        } else {
          throw new Error('Formspree hatası');
        }
      } catch (error) {
        console.error('Error:', error);
        
        // WhatsApp fallback
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const whatsappUrl = `https://wa.me/905323062218?text=Merhaba, ben ${encodeURIComponent(name)}. Mesajım: ${encodeURIComponent(message)}`;
        
        const result = await showAlert(
          'Mesaj gönderilemedi. WhatsApp üzerinden göndermek ister misiniz?', 
          'error', 
          { confirm: true, confirmText: 'WhatsApp ile Gönder', cancelText: 'İptal' }
        );
        
        if(result) {
          window.open(whatsappUrl, '_blank');
        }
      } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      }
    });

    // Telefon numarası formatlama
    document.getElementById('phone').addEventListener('input', function (e) {
      var value = e.target.value.replace(/\D/g, '');
      var formattedValue = '';
      
      if (value.length > 0) formattedValue = value.substring(0, 3);
      if (value.length > 3) formattedValue += ' ' + value.substring(3, 5);
      if (value.length > 5) formattedValue += ' ' + value.substring(5, 7);
      
      e.target.value = formattedValue;
    });

    // Sayfa yüklendiğinde animasyon
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        document.querySelector('h1').style.animation = 'none';
        setTimeout(() => {
          document.querySelector('h1').style.animation = 'titleGlow 2s ease-in-out infinite alternate';
        }, 10);
      }, 100);
    });

    // Haritaya hover efekti
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
      mapContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
      });
      
      mapContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
      });
    }
