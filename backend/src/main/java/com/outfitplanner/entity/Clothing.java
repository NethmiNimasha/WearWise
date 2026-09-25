@Entity
@Table(name = "clothes")
@Getter
@Setter
@NoArgsConstructor
public class Clothing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String category;

    private String color;

    private String style;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}