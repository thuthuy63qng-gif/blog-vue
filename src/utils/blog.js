const POSTS_KEY = 'posts'
import denVauImage from '../assets/den-vau.jpg'
import myTamImage from '../assets/my-tam.jpg'
import sonTungImage from '../assets/son-tung.jpg'

const SAMPLE_POSTS = [
    {
        id: 9001,
        title: 'Đen Vâu và chất tự sự rất riêng trong âm nhạc',
        content: 'Điểm dễ nhận ra trong âm nhạc của Đen Vâu là cách anh lấy chất liệu từ những điều rất đời thường: một chuyến đi, góc phố quen hay cuộc trò chuyện vụn vặt. Những hình ảnh gần gũi ấy giúp câu chuyện trong bài hát không xa lạ với người nghe.\n\nThay vì chỉ kể một câu chuyện, ca từ thường gợi ra câu hỏi về lựa chọn, áp lực và cách mỗi người nhìn cuộc sống. Nhịp rap điềm tĩnh tạo khoảng trống để người nghe chú ý đến lời, còn những liên tưởng bất ngờ khiến một câu hát có thể được hiểu theo nhiều cách.\n\nSức hút của lối viết này nằm ở sự giản dị nhưng có chủ đích. Khi nghe lại, thử để ý cách một hình ảnh nhỏ được nối với cảm xúc lớn hơn; đó cũng là một cách khám phá dấu ấn tự sự của Đen Vâu.',
        image: denVauImage,
        author: 'Ban biên tập',
        date: '10/10/2026',
        comments: []
    },
    {
        id: 9002,
        title: 'Sơn Tùng M-TP: Dấu ấn của một nghệ sĩ đại chúng',
        content: 'Sức hút của một nghệ sĩ đại chúng không chỉ đến từ giai điệu. Với Sơn Tùng M-TP, âm nhạc, hình ảnh sân khấu và cách giới thiệu sản phẩm thường được đặt trong cùng một thế giới thẩm mỹ, giúp mỗi lần trở lại trở thành chủ đề được bàn luận.\n\nCách xây dựng hình ảnh nhất quán giúp khán giả nhận ra màu sắc của nghệ sĩ, trong khi những thay đổi về âm thanh và tạo hình giữ sự tò mò. Đây là bài toán cân bằng: giữ lại dấu ấn quen thuộc nhưng vẫn tạo cảm giác mới cho từng sản phẩm.\n\nNhìn từ góc độ xây dựng thương hiệu nghệ sĩ, hành trình này gợi ý rằng phần trình diễn và truyền thông có thể mở rộng trải nghiệm nghe nhạc. Tuy vậy, yếu tố cốt lõi vẫn là ca khúc và khả năng kết nối cảm xúc với người nghe.',
        image: sonTungImage,
        author: 'Ban biên tập',
        date: '08/10/2026',
        comments: []
    },
    {
        id: 9003,
        title: 'Nhạc Việt và thế hệ nghệ sĩ trẻ đang tạo màu sắc mới',
        content: 'Nhạc Việt hôm nay có nhiều cách pha trộn thể loại: pop có thể gặp rap, R&B hoặc chất liệu dân gian; một ca khúc indie cũng có thể được sản xuất với âm thanh điện tử. Sự pha trộn hiệu quả thường bắt đầu từ ý tưởng của bài hát, thay vì chỉ thêm một nhạc cụ truyền thống để tạo màu sắc.\n\nNền tảng số giúp nghệ sĩ tự giới thiệu sản phẩm, thử nghiệm định dạng ngắn và trò chuyện trực tiếp với cộng đồng người nghe. Cơ hội tiếp cận rộng hơn cũng đi cùng áp lực phải liên tục tạo nội dung mới, nên việc giữ bản sắc riêng trở nên quan trọng.\n\nĐể theo dõi sự đổi mới, có thể nghe cách nghệ sĩ xử lý giọng hát, nhịp điệu và ngôn ngữ trong cùng một ca khúc. Những lựa chọn ấy cho thấy âm nhạc truyền thống và hiện đại có thể đối thoại theo nhiều cách, thay vì đứng ở hai phía đối lập.',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=85',
        author: 'Ban biên tập',
        date: '05/10/2026',
        comments: []
    },
    {
        id: 9004,
        title: 'Mỹ Tâm: sức bền của một giọng ca được nhiều thế hệ yêu mến',
        content: 'Nhắc đến Mỹ Tâm, nhiều khán giả nghĩ đến những ca khúc gắn với các giai đoạn khác nhau trong đời sống nghe nhạc của mình. Sự gần gũi ấy được tạo nên qua giọng hát giàu cảm xúc, cách trình diễn trực tiếp và một hình ảnh nghệ sĩ nhất quán trong thời gian dài.\n\nMột giọng ca có thể thay đổi cách xử lý, phối khí và sân khấu theo từng thời kỳ mà vẫn giữ được điểm nhận diện. Với người nghe, cảm giác quen thuộc không nhất thiết đến từ việc lặp lại công thức; nó có thể đến từ cách truyền tải cảm xúc khiến một bài hát mới vẫn mang nét thân thuộc.\n\nNhìn lại sức bền của Mỹ Tâm cũng là dịp để nghĩ về mối quan hệ giữa nghệ sĩ và khán giả: sự tin cậy được xây dựng qua nhiều lần gặp gỡ, từ bản thu đến sân khấu.',
        image: myTamImage,
        author: 'Ban biên tập', date: '03/10/2026', comments: []
    },
    {
        id: 9005,
        title: 'Hoàng Thùy Linh đưa chất liệu dân gian vào nhạc pop',
        content: 'Một điểm thú vị trong các sản phẩm của Hoàng Thùy Linh là cách hình ảnh văn hóa Việt xuất hiện bên cạnh nhịp điệu pop hiện đại. Trang phục, đạo cụ, chuyển động và màu sắc sân khấu có thể cùng góp phần kể một câu chuyện, thay vì chỉ làm nền cho phần trình diễn.\n\nKhi đưa chất liệu dân gian vào nhạc pop, thử thách là giữ được sự gợi nhắc mà không biến chúng thành chi tiết trang trí. Cách phối khí, cách phát âm và bối cảnh hình ảnh đều ảnh hưởng đến việc người nghe cảm nhận sự kết nối ấy ra sao.\n\nCác sản phẩm này mở ra một câu hỏi đáng suy ngẫm: làm thế nào để chất liệu truyền thống tiếp tục được sáng tạo trong đời sống hiện đại? Câu trả lời có thể khác nhau ở mỗi dự án, và chính sự đa dạng đó làm nên cuộc trò chuyện thú vị.',
        image: 'https://kenh14cdn.com/203336854389633024/2026/3/13/56100672413661750648709234330559827222672754n-234839-1773422660599-17734226711631668251072.jpeg',
        author: 'Ban biên tập', date: '01/10/2026', comments: []
    },
    {
        id: 9006,
        title: 'Hà Anh Tuấn và những đêm nhạc kể chuyện bằng cảm xúc',
        content: 'Một đêm nhạc có thể được nhớ không chỉ bởi danh sách ca khúc mà còn bởi mạch cảm xúc nối các phần trình diễn. Với hình ảnh gắn liền cùng những chương trình được dàn dựng chỉn chu, Hà Anh Tuấn thường tạo cảm giác như đang dẫn khán giả đi qua một câu chuyện bằng âm nhạc.\n\nBản phối, ánh sáng và lời dẫn đều ảnh hưởng đến nhịp của buổi diễn. Khi các yếu tố ấy phục vụ cùng một chủ đề, những ca khúc riêng lẻ có thể trở thành một trải nghiệm liền mạch. Sự gần gũi trên sân khấu cũng giúp khán giả cảm thấy mình đang tham gia vào cuộc gặp gỡ, chứ không chỉ đứng ngoài quan sát.\n\nĐó là lý do nhiều người tìm đến concert như một dịp chia sẻ cảm xúc tập thể. Giá trị của một đêm nhạc vì thế nằm cả ở âm thanh lẫn ký ức mà người xem mang về.',
        image: 'https://cdn-images.vtv.vn/thumb_w/1200/66349b6076cb4dee98746cf1/2025/08/24/af1i7120-copy-13113280183327126311379.jpg',
        imageSource: 'https://vtv.vn/ha-anh-tuan-thang-hoa-cung-loat-hit-don-tim-khan-gia-v-concert-100250824092931108.htm',
        author: 'Ban biên tập', date: '28/09/2026', comments: []
    },
    {
        id: 9007,
        title: 'Vũ. và sức hút của những bản indie thủ thỉ',
        content: 'Âm nhạc của Vũ. thường chọn nhịp kể nhẹ nhàng để nói về tình yêu, ký ức và những đổi thay khó gọi tên. Ca từ không cần quá nhiều hình ảnh cầu kỳ; đôi khi một câu nói giản dị đã đủ gợi ra tâm trạng mà người nghe từng trải qua.\n\nGiai điệu mộc mạc tạo không gian cho giọng hát và lời ca đứng ở vị trí trung tâm. Cách thể hiện thủ thỉ khiến các ca khúc phù hợp với những khoảnh khắc nghe một mình, nhưng cảm xúc riêng tư ấy lại dễ được nhiều người đồng cảm.\n\nSức sống của màu sắc indie nằm một phần ở tiếng nói cá nhân. Khi nghệ sĩ giữ được sự chân thành trong cách viết và trình bày, sự giản dị có thể trở thành lựa chọn thẩm mỹ rõ ràng, không phải sự thiếu đầu tư.',
        image: 'https://afamilycdn.com/150157425591193600/2022/9/30/tuj90411-1664509054180-16645090544422121805701.jpg',
        author: 'Ban biên tập', date: '25/09/2026', comments: []
    },
    {
        id: 9008,
        title: 'HIEUTHUHAI và làn gió mới của rap đại chúng',
        content: 'Rap đại chúng thường cần dung hòa nhịp điệu và cách gieo vần đặc trưng với phần điệp khúc dễ nhớ. HIEUTHUHAI là một gương mặt gắn với hướng tiếp cận này: phần trình diễn tự tin, hình ảnh trẻ trung và cách đặt rap cạnh những yếu tố pop giúp sản phẩm dễ tiếp cận nhiều nhóm khán giả.\n\nSự giao thoa thể loại đem lại cơ hội mở rộng người nghe, nhưng cũng đòi hỏi nghệ sĩ giữ được cá tính trong cách viết và trình bày. Một đoạn rap có dấu ấn không chỉ nằm ở tốc độ hay vần điệu, mà còn ở góc nhìn và thái độ được thể hiện qua lời ca.\n\nNhìn vào hành trình của các nghệ sĩ trẻ, có thể thấy thành công đại chúng thường là kết quả của nhiều yếu tố: âm nhạc, biểu diễn và cách xây dựng kết nối với người hâm mộ.',
        image: 'https://cdn.tienphong.vn/images/bdfc554ea35983ad68a96e0050b6e2cb035dd9e97c62b06a68df6aa35af397b2188d227d0eb41235e9549f05b4208eb83903b22122a28032be2306122805d08db24b0cd2dfddcba1a5cbc673ea86aa8caeb0a29489a00bce1e9defaa6f9529870622dae4b979424198a112af55413ea0/547528032-1261146835812545-6197205715368656551-n-copy.jpg.webp',
        author: 'Ban biên tập', date: '22/09/2026', comments: []
    },
    {
        id: 9009,
        title: 'Phương Mỹ Chi làm mới âm hưởng dân ca cho khán giả trẻ',
        content: 'Khán giả biết đến Phương Mỹ Chi từ những tiết mục dân ca, nhưng hình ảnh nghệ sĩ không đứng yên ở điểm khởi đầu ấy. Việc thử nghiệm cách phối khí và phong cách trình diễn mới cho thấy một giọng hát có thể bước sang không gian khác mà vẫn mang theo ký ức âm nhạc đã làm nên mình.\n\nSự chuyển đổi thuyết phục thường cần cả lựa chọn bài hát lẫn cách thể hiện phù hợp. Nếu chỉ thay đổi trang phục hay nhịp điệu, hình ảnh mới dễ trở thành lớp vỏ; khi nghệ sĩ thực sự khám phá chất liệu và giọng hát của mình, người nghe có thể nhận ra quá trình trưởng thành.\n\nHành trình ấy gợi ra một câu hỏi rộng hơn cho nghệ sĩ trẻ: làm mới bản thân thế nào mà không phủ nhận xuất phát điểm? Câu trả lời nằm trong từng dự án và sự chủ động lựa chọn con đường riêng.',
        image: 'https://kenh14cdn.com/203336854389633024/2026/1/28/ngang-2-mb-1769603616505339898216.jpg',
        author: 'Ban biên tập', date: '19/09/2026', comments: []
    },
    {
        id: 9010,
        title: 'Tóc Tiên biến sân khấu pop thành tuyên ngôn cá tính',
        content: 'Trên sân khấu pop, hình ảnh là một phần của cách kể chuyện. Tóc Tiên thường gắn với những màn trình diễn giàu năng lượng, nơi trang phục, vũ đạo và ánh sáng cùng làm nổi bật tinh thần của tiết mục.\n\nMột diện mạo táo bạo sẽ hiệu quả hơn khi có liên hệ với âm nhạc và thông điệp. Khi các yếu tố được phối hợp, khán giả không chỉ nhớ bộ trang phục mà còn nhớ cảm giác mà màn trình diễn tạo ra. Đây cũng là cách nghệ sĩ dùng sân khấu để thể hiện cá tính một cách trực quan.\n\nKhả năng thay đổi hình ảnh giúp nhạc pop luôn có điều mới để khám phá, nhưng sự nhất quán trong năng lượng biểu diễn vẫn là sợi dây kết nối các giai đoạn khác nhau.',
        image: 'https://i.imgur.com/IUavzDfl.png',
        author: 'Ban biên tập', date: '16/09/2026', comments: []
    },
    {
        id: 9011,
        title: 'Bích Phương và cách kể chuyện duyên dáng qua nhạc pop',
        content: 'Cách kể chuyện dí dỏm là một phần quan trọng trong màu sắc pop của Bích Phương. Những tình huống gần gũi trong ca từ và hình ảnh giúp ca khúc dễ tạo kết nối, còn giai điệu bắt tai khiến người nghe muốn quay lại với bài hát.\n\nSự hài hước trong một sản phẩm nhạc pop cần được cân bằng với âm nhạc và ý tưởng hình ảnh. Khi câu chuyện được triển khai nhất quán từ lời ca đến video, người xem có thêm lý do để nhớ sản phẩm ngoài phần điệp khúc.\n\nĐây là ví dụ cho thấy cá tính nghệ sĩ có thể trở thành chất liệu sáng tác. Một góc nhìn tinh nghịch, nếu được sử dụng đúng lúc, vừa tạo sự giải trí vừa giúp sản phẩm có giọng nói riêng.',
        image: 'https://i.scdn.co/image/ab6761610000e5eb906404e01b48537145d163ba',
        author: 'Ban biên tập', date: '13/09/2026', comments: []
    },
    {
        id: 9012,
        title: 'Tlinh và tiếng nói tự tin của nghệ sĩ nữ trẻ',
        content: 'Âm nhạc của tlinh thường đặt rap cạnh R&B và pop, tạo không gian để giọng hát chuyển đổi giữa nhịp nói và giai điệu. Lối thể hiện tự tin cùng góc nhìn cá nhân trong ca từ giúp các bài hát mang màu sắc riêng của người trẻ.\n\nSự thử nghiệm thể loại cũng mở rộng cách nghệ sĩ nữ xuất hiện trong nhạc Việt: không chỉ gắn với một hình tượng cố định, mà có thể chủ động lựa chọn chủ đề, âm thanh và cách trình diễn. Điều này tạo thêm nhiều hình mẫu để khán giả trẻ tìm thấy sự đồng cảm.\n\nĐiều đáng chú ý không chỉ là sự pha trộn âm nhạc, mà còn là quyền tự kể câu chuyện của mình. Khi nghệ sĩ kiểm soát được tiếng nói và lựa chọn sáng tạo, thử nghiệm trở thành một phần của bản sắc.',
        image: 'https://thethaovanhoa.mediacdn.vn/372676912336973824/2023/3/13/3350681309026357907812937332708030281354975n-16786796828241210474643.jpeg',
        author: 'Ban biên tập', date: '10/09/2026', comments: []
    }
]

export function getPostImage(post) {
    const matchingSample = SAMPLE_POSTS.find(sample => sample.id === post?.id)
    return matchingSample?.image || post?.image || ''
}

export function seedSamplePosts() {
    const posts = readPosts()
    const titleKey = post => (post?.title || '').normalize('NFC').toLocaleLowerCase('vi').replace(/[“”"'’]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
    const duplicateKey = post => {
        const title = titleKey(post)
        if (!title) return `untitled-${post?.id}`
        const plainTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
        // Two headlines about the same artist and the same career overview are duplicate entries.
        if (/my tam/.test(plainTitle) && /hanh trinh|suc ben|hoa mi toc nau|giong ca/.test(plainTitle)) return 'my-tam-career'
        return title
    }
    const groupedPosts = new Map()
    posts.forEach(post => {
        const key = duplicateKey(post)
        const current = groupedPosts.get(key)
        if (!current) {
            groupedPosts.set(key, post)
            return
        }
        const currentIsNewer = Number(post.id) > Number(current.id)
        const winner = currentIsNewer ? post : current
        const other = currentIsNewer ? current : post
        const comments = [...(winner.comments || []), ...(other.comments || [])]
        const uniqueComments = [...new Map(comments.map(comment => [comment.id ?? `${comment.email}-${comment.date}-${comment.content}`, comment])).values()]
        groupedPosts.set(key, { ...other, ...winner, comments: uniqueComments })
    })
    const uniquePosts = [...groupedPosts.values()]
    const existingIds = new Set(uniquePosts.map(post => post.id))
    const existingTitles = new Set(uniquePosts.map(duplicateKey))
    const missingPosts = SAMPLE_POSTS.filter(post => !existingIds.has(post.id) && !existingTitles.has(duplicateKey(post)))
    const samplePosts = new Map(SAMPLE_POSTS.map(post => [post.id, post]))
    let changed = missingPosts.length > 0 || uniquePosts.length !== posts.length

    const refreshedPosts = uniquePosts.map(post => {
        const sample = samplePosts.get(post.id)
        const image = sample?.image || getPostImage(post)
        if (!sample && (!image || post.image === image)) return post

        const refreshedPost = sample
            ? { ...post, title: sample.title, content: sample.content, author: sample.author, date: sample.date, image, imageSource: sample.imageSource || post.imageSource }
            : { ...post, image }
        if (JSON.stringify(post) === JSON.stringify(refreshedPost)) return post
        changed = true
        return refreshedPost
    })

    if (changed) savePosts([...refreshedPosts, ...missingPosts])
}

export function readPosts() {
    try {
        const posts = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')
        return Array.isArray(posts) ? posts : []
    } catch {
        return []
    }
}

export function savePosts(posts) {
    if (!Array.isArray(posts)) return false

    try {
        localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
        return true
    } catch {
        return false
    }
}

export function prepareImageUpload(file) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type?.startsWith('image/')) {
            reject(new Error('Hãy chọn một tệp hình ảnh.'))
            return
        }
        if (file.size > 12 * 1024 * 1024) {
            reject(new Error('Ảnh gốc quá lớn. Hãy chọn ảnh nhỏ hơn 12 MB.'))
            return
        }

        const objectUrl = URL.createObjectURL(file)
        const source = new Image()
        source.onload = () => {
            URL.revokeObjectURL(objectUrl)
            const maxDimension = 1400
            const scale = Math.min(1, maxDimension / Math.max(source.naturalWidth, source.naturalHeight))
            const canvas = document.createElement('canvas')
            canvas.width = Math.max(1, Math.round(source.naturalWidth * scale))
            canvas.height = Math.max(1, Math.round(source.naturalHeight * scale))
            const context = canvas.getContext('2d')
            if (!context) {
                reject(new Error('Không thể xử lý ảnh trên trình duyệt này.'))
                return
            }
            context.drawImage(source, 0, 0, canvas.width, canvas.height)

            let compressed = ''
            for (const quality of [0.82, 0.72, 0.62, 0.52]) {
                compressed = canvas.toDataURL('image/webp', quality)
                if (!compressed.startsWith('data:image/webp')) {
                    compressed = canvas.toDataURL('image/jpeg', quality)
                }
                if (compressed.length <= 1_000_000) break
            }
            if (compressed.length > 1_000_000) {
                reject(new Error('Ảnh vẫn còn quá nặng sau khi nén. Hãy chọn ảnh khác.'))
                return
            }
            resolve(compressed)
        }
        source.onerror = () => {
            URL.revokeObjectURL(objectUrl)
            reject(new Error('Không đọc được tệp ảnh này.'))
        }
        source.src = objectUrl
    })
}

export function getPostCategory(post) {
    const title = (post?.title || '').toLocaleLowerCase('vi')
    const text = `${title} ${post?.content || ''}`.toLocaleLowerCase('vi')

    if (/công khai vợ|công khai người yêu|hẹn hò|đám cưới|scandal|tin đồn|đời tư|sao việt|quân\s*a\.?p\.?/.test(title)) return 'Tin sao'
    if (/phim|diễn viên|đạo diễn|phòng vé|cinema|movie|drama/.test(title)) return 'Phim ảnh'
    if (/thời trang|fashion|phong cách|outfit|làm đẹp|makeup/.test(title)) return 'Thời trang & Làm đẹp'
    if (/nhạc|ca sĩ|ca nhạc|âm nhạc|album|bài hát|concert|đêm nhạc|sân khấu pop|singer|rap|r&b|\bpop\b|indie|dân ca|giọng ca|giai điệu|đen vâu|sơn tùng|mỹ tâm|hoàng thùy linh|hà anh tuấn|vũ\.|hieuthuhai|phương mỹ chi|tóc tiên|bích phương|tlinh/.test(title)) return 'Âm nhạc'

    return 'Đời sống nghệ sĩ'
}

export function getReadingMinutes(content) {
    const wordCount = (content || '').trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(wordCount / 200))
}

export function getExcerpt(content, maxLength = 120) {
    const text = content || ''
    if (text.length <= maxLength) return text

    const excerpt = text.slice(0, maxLength + 1)
    const lastSpace = excerpt.lastIndexOf(' ')
    return `${excerpt.slice(0, lastSpace > 0 ? lastSpace : maxLength).trim()}…`
}
