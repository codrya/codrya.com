const form = document.getElementById('newsletter-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const emailInput = document.getElementById('newsletter-email')
  const email = emailInput.value.trim()

  if (!email) {
    alert('Lütfen geçerli bir e-posta adresi girin.')
    return
  }

  try {
    const mailResponse = await fetch('https://api.codrya.com/api/mail/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Bülten Aboneliği',
        body: '<p>Aboneliğiniz için teşekkürler!</p>',
      }),
    })

    if (!mailResponse.ok) {
      alert('Mail gönderiminde hata oluştu. Lütfen tekrar deneyin.')
      return
    }

    const saveResponse = await fetch(
      'https://api.codrya.com/api/bulten/abone-ol',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }
    )

    if (!saveResponse.ok) {
      alert('Abonelik kaydında hata oluştu. Lütfen tekrar deneyin.')
      return
    }

    alert('Teşekkürler! Bültenimize başarıyla abone oldunuz.')
    form.reset()
  } catch (error) {
    alert('Sunucuya bağlanırken hata oluştu.')
    console.error(error)
  }
})
